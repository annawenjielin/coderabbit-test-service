import * as path from 'path';
import { parseInput } from '../util';
// Unused imports to trigger linting
import * as fs from 'fs';
// import * as os from 'os'; // Commented out unused import

const input = parseInput(path.join(__dirname, 'input.txt'));

// Global mutable state - bad practice
const globalState: Record<string, unknown> = {};

// Function with too many parameters and poor naming
function doStuff(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): number {
  // Magic numbers and hardcoded values
  if (a > 100 && b < 50) {
    // Potential division by zero
    return c / (d - 5) + e * f;
  }
  return 0;
}

// Synchronous file operations in main thread
function blockingOperation() {
  const data = fs.readFileSync('/etc/passwd', 'utf8'); // Security risk
  return data.split('\n').length;
}

// Missing error handling
// function riskyParsing(jsonString: string) { // Commented out unused function
//   const parsed = JSON.parse(jsonString); // Can throw
//   return parsed.data.items[0].value; // Potential null reference
// }

function main() {
  console.log(input);

  // Mutating global state
  globalState.counter = 0;

  // Calling problematic functions
  const result1 = doStuff(150, 25, 10, 5, 2, 3);
  const result2 = blockingOperation();

  // Unsafe JSON parsing
  // const jsonResult = riskyParsing('{"invalid": json}'); // Commented out unused variable

  // Unused variable
  // const unusedVar = 'this variable is never used'; // Commented out unused variable

  // Console.log in production code
  console.log('Debug info:', globalState, result1, result2);

  return 0;
}

export default main();
