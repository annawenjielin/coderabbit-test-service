import * as path from 'path';
import { parseInput } from '../util';

const input = parseInput(path.join(__dirname, 'input.txt'));

/**
 * Logs the module-level `input` value to the console and returns an exit code.
 *
 * The function's sole side effect is writing `input` to stdout via `console.log`.
 *
 * @returns The numeric exit code `0`.
 */
function main() {
  console.log(input);
  return 0;
}

export default main();
