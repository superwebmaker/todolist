const fs = require('fs');
const path = require('path');

// List of environment variables to expose to the client
const ENV_VARS = [
  'PERSISTENCE_PROVIDER',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'APPWRITE_URL',
  'APPWRITE_PROJECT_ID',
  'APPWRITE_DATABASE_ID',
  'POCKETBASE_URL'
];

// Helper to get env var
const getEnv = (key) => process.env[key] || '';

// Generate the config object
const config = {};
ENV_VARS.forEach(key => {
  const value = getEnv(key);
  if (value) {
    config[key] = value;
  }
});

// Create the file content
const fileContent = `window.__ENV = ${JSON.stringify(config, null, 2)};`;

// Write to env-config.js in the current directory (public folder)
const outputPath = path.join(__dirname, 'env-config.js');
fs.writeFileSync(outputPath, fileContent);

console.log(`Generated env-config.js with keys: ${Object.keys(config).join(', ')}`);
