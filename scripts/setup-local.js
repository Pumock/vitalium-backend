#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function colorLog(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execPromise(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function checkPrerequisites() {
  colorLog('\n🏥 Vitalium Backend - Local Development Setup', 'cyan');
  colorLog('================================================', 'cyan');

  colorLog('\n🔍 Checking prerequisites...', 'yellow');

  // Check Docker
  try {
    await execPromise('docker --version');
    colorLog('✅ Docker is installed', 'green');
  } catch (error) {
    colorLog('❌ Docker is not installed or not running', 'red');
    colorLog(
      'Please install Docker Desktop: https://www.docker.com/products/docker-desktop/',
      'yellow',
    );
    process.exit(1);
  }

  // Check Node.js
  try {
    const { stdout } = await execPromise('node --version');
    colorLog(`✅ Node.js is installed: ${stdout.trim()}`, 'green');
  } catch (error) {
    colorLog('❌ Node.js is not installed', 'red');
    colorLog('Please install Node.js 18+: https://nodejs.org/', 'yellow');
    process.exit(1);
  }

  // Check if .env file exists
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    colorLog('⚠️ .env file not found', 'yellow');
    colorLog('Creating .env file with default values...', 'yellow');

    const defaultEnv = `# Local PostgreSQL Database Configuration
DATABASE_URL="postgresql://vitalium:vitalium123@localhost:5432/vitalium?schema=public"

# Database Configuration (for Docker Compose)
POSTGRES_DB=vitalium
POSTGRES_USER=vitalium
POSTGRES_PASSWORD=vitalium123

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-for-vitalium-backend-dev"
JWT_EXPIRES_IN="24h"

# Application Configuration
NODE_ENV="development"
PORT=3000

# Monitoring Configuration
LOG_LEVEL=debug
ENABLE_METRICS=true`;

    fs.writeFileSync(envPath, defaultEnv);
    colorLog('✅ .env file created', 'green');
  } else {
    colorLog('✅ .env file exists', 'green');
  }
}

async function runCommand(command, description, color = 'yellow') {
  colorLog(`\n${description}`, color);
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.log(stderr);
    }
    if (stdout) {
      console.log(stdout);
    }
    colorLog(`✅ ${description} completed successfully`, 'green');
    return true;
  } catch (error) {
    colorLog(`❌ ${description} failed`, 'red');
    if (error.stderr) {
      console.error(error.stderr);
    }
    if (error.stdout) {
      console.log(error.stdout);
    }
    return false;
  }
}

async function waitForDatabase() {
  colorLog('\n⏳ Waiting for PostgreSQL to be ready...', 'yellow');

  const maxAttempts = 30;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      await execPromise(
        'docker exec vitalium-postgres pg_isready -U vitalium -d vitalium',
      );
      colorLog('✅ PostgreSQL is ready!', 'green');
      return true;
    } catch (error) {
      attempt++;
      colorLog(
        `⏳ Attempt ${attempt}/${maxAttempts} - PostgreSQL starting...`,
        'yellow',
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  colorLog('❌ PostgreSQL failed to start within timeout', 'red');
  return false;
}

async function main() {
  try {
    // Check prerequisites
    await checkPrerequisites();

    // Generate Prisma client
    const prismaGenerated = await runCommand(
      'npx prisma generate',
      '🔧 Generating Prisma client...',
    );
    if (!prismaGenerated) process.exit(1);

    // Check if database is running
    let dbRunning = false;
    try {
      await execPromise(
        'docker exec vitalium-postgres pg_isready -U vitalium -d vitalium',
      );
      colorLog('✅ PostgreSQL is already running', 'green');
      dbRunning = true;
    } catch (error) {
      colorLog('🗄️ PostgreSQL not running, starting it...', 'yellow');
    }

    // Start database if not running
    if (!dbRunning) {
      const dbStarted = await runCommand(
        'docker-compose up postgres -d',
        '🗄️ Starting PostgreSQL database...',
      );
      if (!dbStarted) process.exit(1);

      // Wait for database to be ready
      const dbReady = await waitForDatabase();
      if (!dbReady) process.exit(1);
    }

    // Push database schema
    const schemaPushed = await runCommand(
      'npx prisma db push',
      '📊 Synchronizing database schema...',
    );
    if (!schemaPushed) process.exit(1);

    // Build application
    const appBuilt = await runCommand(
      'npm run build',
      '🏗️ Building application...',
    );
    if (!appBuilt) process.exit(1);

    // Run tests
    colorLog('\n🧪 Running tests...', 'yellow');
    try {
      await execPromise('npm test');
      colorLog('✅ All tests passed!', 'green');
    } catch (error) {
      colorLog('⚠️ Some tests failed - but continuing...', 'yellow');
    }

    // Success message
    colorLog(
      '\n🎉 SUCCESS! Vitalium Backend is ready for development!',
      'green',
    );
    colorLog(
      '================================================================',
      'green',
    );
    colorLog('\n📋 Available Services:', 'cyan');
    colorLog('   🚀 API Server:          http://localhost:3000', 'white');
    colorLog(
      '   📚 Swagger Docs:        http://localhost:3000/api/docs',
      'white',
    );
    colorLog(
      '   ❤️ Health Check:        http://localhost:3000/health',
      'white',
    );
    colorLog(
      '   🗄️ Database:            localhost:5432 (vitalium/vitalium123)',
      'white',
    );
    colorLog(
      '   🎨 Prisma Studio:       npx prisma studio (http://localhost:5555)',
      'white',
    );

    colorLog('\n🔧 Quick Commands:', 'cyan');
    colorLog('   npm run start:dev       - Start development server', 'white');
    colorLog('   npm run db:studio       - Open database admin UI', 'white');
    colorLog('   npm run test:watch      - Run tests in watch mode', 'white');
    colorLog('   npm run health          - Check server health', 'white');

    colorLog('\n✨ Run "npm run start:dev" to start developing!', 'bright');
  } catch (error) {
    colorLog('\n❌ Setup failed with error:', 'red');
    console.error(error);
    process.exit(1);
  }
}

main();
