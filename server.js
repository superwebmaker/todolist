const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 1. Load Environment Variables (for local server scenario)
try {
  const dotenv = require('dotenv');
  // Priority: .env.production -> .env
  if (fs.existsSync('.env.production')) {
    console.log('Loading .env.production...');
    dotenv.config({ path: '.env.production' });
  } else if (fs.existsSync('.env')) {
    console.log('Loading .env...');
    dotenv.config();
  }
} catch (e) {
  console.log('Note: dotenv not loaded (module not found or not needed).');
}

// 2. Generate Runtime Config (env-config.js)
console.log('Generating runtime configuration...');
try {
  require('./generate-config.js');
} catch (e) {
  console.error('Error generating configuration:', e);
}

// 3. Start Static Server (sirv)
console.log('Starting server on port 5000...');
const sirv = spawn('npx', ['sirv', '.', '--single', '--host', '--port', '5000'], {
  stdio: 'inherit',
  shell: true
});

sirv.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});
