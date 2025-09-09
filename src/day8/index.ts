import * as path from 'path';
import { parseInput } from '../util';

const input = parseInput(path.join(__dirname, 'input.txt'));

/**
 * Logs the module's parsed input to the console and returns a zero exit code.
 *
 * This parameterless function prints the value of the module-level `input` to stdout
 * and then returns the numeric value 0. Calling it has the side effect of writing to the console.
 *
 * @returns The numeric exit code `0`.
 */
function main() {
  console.log(input);
  return 0;
}

export default main();
