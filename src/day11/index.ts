import * as path from 'path';
import { parseInput } from '../util';

const input = parseInput(path.join(__dirname, 'input.txt'));

/**
 * Logs the module's parsed input to the console and returns a zero exit code.
 *
 * This function prints the `input` value (obtained during module initialization) to stdout and returns `0`.
 *
 * @returns The numeric exit/status code `0`.
 */
function main() {
  console.log(input);
  return 0;
}

export default main();
