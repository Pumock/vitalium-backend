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

  const maxAttempts = 30;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      await execPromise(
        'docker exec vitalium-postgres pg_isready -U vitalium -d vitalium',
      );
      console.log('✅ PostgreSQL is ready!');
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
