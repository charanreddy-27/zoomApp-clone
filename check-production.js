#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('MeetSync Production Readiness Check');
console.log('================================');

// Check for required files
const requiredFiles = [
  'next.config.mjs',
  'vercel.json',
  'package.json',
  'middleware.ts',
];

let allFilesExist = true;
console.log('\nChecking required files:');

for (const file of requiredFiles) {
  try {
    if (fs.accessSync(file, fs.constants.F_OK) === undefined) {
      console.log(`✓ ${file} exists`);
    }
  } catch (error) {
    console.log(`✗ ${file} is missing`);
    allFilesExist = false;
  }
}

// Check for .env.local file
try {
  if (fs.accessSync('.env.local', fs.constants.F_OK) === undefined) {
    console.log(`✓ .env.local exists`);
    
    // Check for environment variables
    console.log('\nChecking environment variables:');
    try {
      const envFile = fs.readFileSync('.env.local', 'utf8');
      const requiredEnvVars = [
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
        'CLERK_SECRET_KEY',
        'NEXT_PUBLIC_STREAM_KEY',
        'STREAM_SECRET'
      ];
      
      let allEnvVarsExist = true;
      
      requiredEnvVars.forEach(envVar => {
        if (envFile.includes(envVar)) {
          console.log(`✓ ${envVar} is set`);
        } else {
          console.log(`✗ ${envVar} is missing`);
          allEnvVarsExist = false;
        }
      });
      
      if (!allEnvVarsExist) {
        console.log('\nSome environment variables are missing. Please check your .env.local file.');
        allFilesExist = false;
      }
    } catch (error) {
      console.log('Could not read .env.local file. Make sure it has the correct permissions.');
      allFilesExist = false;
    }
  }
} catch (error) {
  console.log(`✗ .env.local is missing`);
  console.log('\nNote: .env.local is required for local development but not for Vercel deployment.');
  console.log('Make sure to set all environment variables in the Vercel dashboard.');
}

// Final verdict
console.log('\n================================');
if (allFilesExist) {
  console.log('✅ Your project is ready for production deployment!');
  console.log('Run `deploy.bat` to deploy to Vercel.');
  process.exit(0);
} else {
  console.log('❌ Your project is not ready for production deployment.');
  console.log('Please fix the issues above before deploying.');
  process.exit(1);
} 