// import * as path from 'path'; // Commented out unused import
// import { parseInput } from '../util'; // Commented out unused import
// import * as fs from 'fs'; // Commented out unused import
// import { exec } from 'child_process'; // Commented out unused import
import {
  loadSecureConfig,
  isValidPassword,
  generateSecureSessionId,
} from '../utils/config';

// Unused import - should trigger linting warning
// import * as crypto from 'crypto'; // Commented out unused import
// import * as util from 'util'; // Commented out unused import

// const input = parseInput(path.join(__dirname, 'input.txt'), {
//   split: { mapper: false },
// }); // Commented out - now using secure config

// Global variable - bad practice
let globalCounter = 0;
// const unsafeData: unknown = null; // Commented out unused variable

// Security Issue #1: Command injection vulnerability
// function executeUserCommand(userInput: string) { // Commented out unused function
// DANGEROUS: Direct command execution without sanitization
//   exec(`echo ${userInput}`, (error, stdout) => {
//     console.log(stdout);
//   });
// } // End commented function

// Security Issue #2: File system vulnerability
// function readUserFile(filename: unknown) { // Commented out unused function
// No input validation - path traversal vulnerability
// return fs.readFileSync(filename, 'utf8');
// } // End commented function

// Performance Issue #1: Inefficient nested loops
// function findDuplicates(arr: unknown[]): unknown[] { // Commented out unused function
//   const duplicates = [];
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length; j++) {
//       for (let k = 0; k < arr.length; k++) {
//         // Unnecessary triple nested loop
//         if (i !== j && arr[i] === arr[j]) {
//           duplicates.push(arr[i]);
//         }
//       }
//     }
//   }
//   return duplicates;
// } // End commented function

// Performance Issue #2: Memory leak potential
// function createMemoryLeak() { // Commented out unused function
//   const leakyArray: unknown[] = [];
//   setInterval(() => {
//     leakyArray.push(new Array(1000000).fill('data')); // Never cleaned up
//   }, 100);
//   return leakyArray;
// } // End commented function

// TypeScript Issues
// function processData(data: unknown): unknown { // Commented out unused function
//   // Using 'any' everywhere - defeats TypeScript benefits
//   let result: unknown = data;
//
//   // Potential null pointer exception
//   if (data) {
//     result = data.someProperty.anotherProperty.value;
//   }
//
//   // Type assertion without checking
//   const typedResult = result as string[];
//   return typedResult.map((item) => item.toUpperCase());
// } // End commented function

// Code Quality Issues
// function badNaming(x: number, y: number, z: number): string | null { // Commented out unused function
//   // Poor variable names
//   const a = x + y;
//   const b = a * z;
//   const c = b / 2;
//
//   // Magic numbers
//   if (c > 42) {
//     return c * 3.14159;
//   }
//
//   // Deep nesting
//   if (x) {
//     if (y) {
//       if (z) {
//         if (a > b) {
//           if (c < 100) {
//             return 'deeply nested result';
//           }
//         }
//       }
//     }
//   }
//
//   return null;
// } // End commented function

// Error Handling Issues
function riskyOperation() {
  // No error handling for potential failures
  const data = JSON.parse('invalid json');
  const result = data.map((item) => item.process());
  return result[0].value;
}

// Async/Promise Issues
async function badAsyncCode() {
  // Not awaiting promises
  const promise1 = fetch('https://api.example.com/data');
  const promise2 = fetch('https://api.example.com/more-data');

  // Race condition potential
  globalCounter++;

  // Missing error handling
  const result1 = await promise1;
  const result2 = await promise2;

  return { result1, result2 };
}

// Authentication/Authorization Issues
// function authenticateUser(username: string, password: string): boolean { // Commented out unused function
//   // Hardcoded credentials - security vulnerability
//   const adminUser = 'admin';
//   const adminPass = 'password123';
//
//   // Weak password comparison (should use secure comparison)
//   if (username === adminUser && password === adminPass) {
//     return true;
//   }
//
//   // No rate limiting, brute force vulnerability
//   return false;
// } // End commented function

// SQL Injection vulnerability (simulated)
// function getUserData(userId: string) { // Commented out unused function
//   // Simulated SQL injection vulnerability
//   const query = `SELECT * FROM users WHERE id = '${userId}'`;
//   console.log('Executing query:', query);
//   return query;
// } // End commented function

function main() {
  console.log('Starting secure code execution...');

  try {
    // Load secure configuration from environment variables
    const secureConfig = loadSecureConfig();

    // Process the secure credential data
    secureConfig.userCredentials.forEach(({ username, password }) => {
      // Security improvement: No longer logging sensitive data
      console.log(`Processing user: ${username}`);

      // Validate password strength
      if (isValidPassword(password)) {
        console.log(`✅ User ${username} has a strong password`);

        // Generate secure session ID
        const sessionId = generateSecureSessionId();
        console.log(
          `Generated secure session: ${sessionId.substring(0, 8)}...`,
        );
      } else {
        console.log(`⚠️ User ${username} has a weak password`);
      }
    });
  } catch (error) {
    console.error('Configuration error:', error.message);
    console.log('Please set up your environment variables using env.example');
  }

  // Performance issues
  // const duplicates = findDuplicates(input); // Commented out unused variable
  // const leakyData = createMemoryLeak(); // Commented out unused variable

  // Type safety issues
  // const processedData = processData(unsafeData); // Commented out unused variable

  // Code quality issues
  // const badResult = badNaming(1, 2, 3); // Commented out unused variable

  // Error handling issues
  try {
    riskyOperation();
  } catch (e) {
    // Empty catch block - bad practice
  }

  // Async issues (not properly handled)
  badAsyncCode();

  return globalCounter;
}

export default main();
