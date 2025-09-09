import * as path from 'path';
import { parseInput } from '../util';

const input = parseInput(path.join(__dirname, 'input.txt'));

/**
 * Logs the parsed input to the console and returns a status code.
 *
 * Calls `console.log` with the module-level `input` value and returns `0`.
 *
 * @returns Always returns the numeric value `0`.
 */
function main() {
  console.log(input);
  return 0;
}

export default main();
