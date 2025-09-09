import * as path from 'path';
import { parseInput } from '../util';

const input = parseInput(path.join(__dirname, 'input.txt'));

/**
 * Logs the module-level `input` to the console and returns 0.
 *
 * This function has the side effect of writing `input` to stdout. It returns the numeric value `0`.
 *
 * @returns The number `0`.
 */
function main() {
  console.log(input);
  return 0;
}

export default main();
