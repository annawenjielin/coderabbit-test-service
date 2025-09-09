import * as path from 'path';
import { parseInput } from '../util';
// Unused imports to trigger linting
import * as fs from 'fs';
// import * as os from 'os'; // Commented out unused import

const input = parseInput(path.join(__dirname, 'input.txt'));

// Global mutable state - bad practice
const globalState: Record<string, unknown> = {};

/**
 * Conditionally computes a numeric expression when two input thresholds are met.
 *
 * If `a > 100` and `b < 50`, returns `c / (d - 5) + e * f`; otherwise returns `0`.
 *
 * @param a - First threshold value; the condition requires `a > 100`.
 * @param b - Second threshold value; the condition requires `b < 50`.
 * @param c - Numerator used in the division portion of the result.
 * @param d - Divisor base: the code divides by `(d - 5)`. If `d === 5` the division produces `Infinity`.
 * @param e - Left operand of the multiplication term `e * f`.
 * @param f - Right operand of the multiplication term `e * f`.
 * @returns The computed number when the threshold condition is satisfied, otherwise `0`.
 */
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

/**
 * Reads /etc/passwd synchronously and returns the number of lines.
 *
 * This performs a blocking filesystem read on the main thread (calls `fs.readFileSync`)
 * and therefore can impact application responsiveness. It also reads a system file
 * (`/etc/passwd`), which may be a security-sensitive operation depending on context.
 *
 * @returns The number of newline-separated lines in `/etc/passwd`.
 */
function blockingOperation() {
  const data = fs.readFileSync('/etc/passwd', 'utf8'); // Security risk
  return data.split('\n').length;
}

// Missing error handling
// function riskyParsing(jsonString: string) { // Commented out unused function
//   const parsed = JSON.parse(jsonString); // Can throw
//   return parsed.data.items[0].value; // Potential null reference
/**
 * Entry point that demonstrates program flow, side effects, and returns an exit code.
 *
 * Performs synchronous actions: logs the parsed input, mutates `globalState.counter`,
 * invokes `doStuff` (pure computation) and `blockingOperation` (performs blocking I/O),
 * then logs debug information and returns 0.
 *
 * Note: this function has side effects (console output, mutation of `globalState`,
 * and synchronous filesystem access via `blockingOperation`).
 *
 * @returns 0 indicating successful completion
 */

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
