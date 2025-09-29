// Simple health check script for Docker
import http from 'http';

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000,
  method: 'GET',
};

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.log('ERROR: ', err.message);
  process.exit(1);
});

request.on('timeout', () => {
  console.log('TIMEOUT: Health check timed out');
  request.destroy();
  process.exit(1);
});

request.end();
