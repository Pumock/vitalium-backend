#!/usr/bin/env node
import { exec } from 'child_process';

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function waitForDatabase() {
  console.log('⏳ Waiting for PostgreSQL to be ready...');

  const maxAttempts = 60; // 2 minutes
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      // Try to connect to database using the container network
      await execPromise(
        'docker exec vitalium-postgres-dev pg_isready -U vitalium -d vitalium',
      );
      console.log('✅ PostgreSQL is ready!');

      // Wait a bit more to ensure migrations can run
      console.log('⏳ Waiting for database to be fully initialized...');
      await new Promise((resolve) => setTimeout(resolve, 5000));

      return true;
    } catch (error) {
      attempt++;
      console.log(
        `⏳ Attempt ${attempt}/${maxAttempts} - PostgreSQL starting...`,
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log('❌ PostgreSQL failed to start within timeout');
  process.exit(1);
}

waitForDatabase();
