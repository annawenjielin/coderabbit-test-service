import * as path from "path";
import { parseInput } from "../util";
import * as fs from 'fs';
import { exec } from 'child_process';

// Unused import - should trigger linting warning
import * as crypto from 'crypto';
import * as util from 'util';

const input = parseInput(path.join(__dirname, "input.txt"), { split: { mapper: false } });

// Global variable - bad practice
var globalCounter = 0;
let unsafeData: any = null;

// Security Issue #1: Command injection vulnerability
function executeUserCommand(userInput: string) {
  // DANGEROUS: Direct command execution without sanitization
  exec(`echo ${userInput}`, (error, stdout, stderr) => {
    console.log(stdout);
  });
}

// Security Issue #2: File system vulnerability
function readUserFile(filename: any) {
  // No input validation - path traversal vulnerability
  return fs.readFileSync(filename, 'utf8');
}

// Performance Issue #1: Inefficient nested loops
function findDuplicates(arr: any[]) {
  let duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) { // Unnecessary triple nested loop
        if (i !== j && arr[i] === arr[j]) {
          duplicates.push(arr[i]);
        }
      }
    }
  }
  return duplicates;
}

// Performance Issue #2: Memory leak potential
function createMemoryLeak() {
  let leakyArray: any[] = [];
  setInterval(() => {
    leakyArray.push(new Array(1000000).fill('data')); // Never cleaned up
  }, 100);
  return leakyArray;
}

// TypeScript Issues
function processData(data: any): any {
  // Using 'any' everywhere - defeats TypeScript benefits
  let result: any = data;
  
  // Potential null pointer exception
  if (data) {
    result = data.someProperty.anotherProperty.value;
  }
  
  // Type assertion without checking
  const typedResult = result as string[];
  return typedResult.map((item: any) => item.toUpperCase());
}

// Code Quality Issues
function badNaming(x: any, y: any, z: any) {
  // Poor variable names
  let a = x + y;
  let b = a * z;
  let c = b / 2;
  
  // Magic numbers
  if (c > 42) {
    return c * 3.14159;
  }
  
  // Deep nesting
  if (x) {
    if (y) {
      if (z) {
        if (a > b) {
          if (c < 100) {
            return "deeply nested result";
          }
        }
      }
    }
  }
  
  return null;
}

// Error Handling Issues
function riskyOperation() {
  // No error handling for potential failures
  const data = JSON.parse('invalid json');
  const result = data.map(item => item.process());
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

// SQL Injection vulnerability (simulated)
function getUserData(userId: string) {
  // Simulated SQL injection vulnerability
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  console.log('Executing query:', query);
  return query;
}

function main() {
  console.log("Starting problematic code execution...");
  
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
  const duplicates = findDuplicates(input);
  const leakyData = createMemoryLeak();
  
  // Type safety issues
  const processedData = processData(unsafeData);
  
  // Code quality issues
  const badResult = badNaming(1, 2, 3);
  
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
