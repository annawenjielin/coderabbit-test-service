import * as path from 'path';
import { parseInput } from '../util';
// import * as fs from 'fs'; // Commented out unused import
import { exec } from 'child_process';

// Unused import - should trigger linting warning
// import * as crypto from 'crypto'; // Commented out unused import
// import * as util from 'util'; // Commented out unused import

const input = parseInput(path.join(__dirname, 'input.txt'), {
  split: { mapper: false },
});

// Global variable - bad practice
let globalCounter = 0;
// const unsafeData: unknown = null; // Commented out unused variable

/**
 * Executes a shell command that echoes the provided input.
 *
 * This runs a system command constructed from `userInput` without any sanitization,
 * which allows command injection if `userInput` contains shell metacharacters.
 * The function logs the command's stdout via a callback and does not return a value.
 *
 * @param userInput - Text that will be inserted directly into the shell command; unsafe if untrusted.
 */
function executeUserCommand(userInput: string) {
  // DANGEROUS: Direct command execution without sanitization
  exec(`echo ${userInput}`, (error, stdout) => {
    console.log(stdout);
  });
}

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

/**
 * Parses a JSON string, transforms the parsed array by calling `process()` on each item, and returns the `value` of the first result.
 *
 * The function expects the parsed JSON to be an array of objects where each object has a `process()` method that returns an object with a `value` property.
 *
 * Throws if the JSON is invalid, if the parsed value is not an array, if an item lacks a `process` method, or if the resulting first item has no `value` property.
 *
 * @returns The `value` property of the first processed item.
 */
function riskyOperation() {
  // No error handling for potential failures
  const data = JSON.parse('invalid json');
  const result = data.map((item) => item.process());
  return result[0].value;
}

/**
 * Starts two concurrent fetch requests, awaits both, and returns their responses.
 *
 * Begins two fetches in parallel, increments the module-level `globalCounter`, then awaits both promises and returns an object containing each fetch response.
 *
 * Note: this function does not perform any retry or explicit error handling; if either fetch rejects the returned promise will reject.
 *
 * @returns An object with `result1` and `result2`, the resolved Response objects from the two fetch calls.
 */
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

/**
 * Verifies credentials against a single hard-coded administrator account.
 *
 * Returns true only when `username` and `password` exactly match the embedded
 * admin credentials ("admin" / "password123"); otherwise returns false.
 *
 * Security notes:
 * - Credentials are hard-coded and must not be used in production.
 * - Comparison is a plain equality check (not constant-time) and there is no
 *   rate limiting, making this vulnerable to credential theft and brute-force attacks.
 *
 * @param username - Username to authenticate (compared to the hard-coded admin user)
 * @param password - Password to authenticate (compared to the hard-coded admin password)
 * @returns True if credentials match the hard-coded admin account, false otherwise
 */
function authenticateUser(username: string, password: string): boolean {
  // Hardcoded credentials - security vulnerability
  const adminUser = 'admin';
  const adminPass = 'password123';

  // Weak password comparison (should use secure comparison)
  if (username === adminUser && password === adminPass) {
    return true;
  }

  // No rate limiting, brute force vulnerability
  return false;
}

/**
 * Construct a SQL query string to fetch a user by id.
 *
 * The `userId` is interpolated directly into the query string without
 * sanitization or parameterization — this function demonstrates a SQL
 * injection vulnerability and should not be used with untrusted input.
 *
 * @param userId - User identifier inserted verbatim into the query (unsafe)
 * @returns The constructed SQL query string
 */
function getUserData(userId: string) {
  // Simulated SQL injection vulnerability
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  console.log('Executing query:', query);
  return query;
}

/**
 * Orchestrates processing of parsed input lines, runs several intentionally unsafe operations, and returns a global counter.
 *
 * For each input line (expected "username:password"), this function logs the username and password, attempts authentication,
 * and—on success—invokes functions that execute a shell command with the username and construct a SQL-like query using the username.
 * It also calls a function that performs a JSON parse and other unsafe transformations inside a try/catch that swallows errors,
 * and starts an asynchronous operation without awaiting it.
 *
 * Side effects: writes to console, may execute shell commands, may construct/log SQL-like queries, and triggers various other
 * unsafe or poorly handled operations present in the module.
 *
 * @returns The module-level numeric counter (globalCounter).
 */
function main() {
  console.log('Starting problematic code execution...');

  // Process the input data
  input.forEach((line: string) => {
    const [username, password] = line.split(':');

    // Security issue: logging sensitive data
    console.log(`Processing user: ${username} with password: ${password}`);

    // Call vulnerable functions
    if (authenticateUser(username, password)) {
      executeUserCommand(username); // Command injection risk
      const userData = getUserData(username); // SQL injection risk
      console.log(userData);
    }
  });

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
