import * as path from 'path';
import { parseInput } from '../util';

const input = parseInput(path.join(__dirname, 'input.txt'));

/**
 * Logs the module's loaded input to the console and returns 0.
 *
 * The function performs a side effect by writing the top-level `input`
 * value (resolved during module initialization) to stdout, then returns
 * the integer 0.
 *
 * @returns The number 0.
 */
function main() {
  console.log(input);
  return 0;
}

export default main();
