import * as path from 'path';
import { parseInput } from '../util';
import * as fs from 'fs';

const input = parseInput(path.join(__dirname, 'input.txt'));

const globalState: Record<string, unknown> = {};

function doStuff(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): number {
  if (a > 100 && b < 50) {
    return c / (d - 5) + e * f;
  }
  return 0;
}

function blockingOperation() {
  const data = fs.readFileSync('/etc/passwd', 'utf8');
  return data.split('\n').length;
}

function main() {
  console.log(input);

  (globalState as Record<string, unknown>).counter = 0;

  const result1 = doStuff(150, 25, 10, 5, 2, 3);
  const result2 = blockingOperation();

  console.log('Debug info:', globalState, result1, result2);

  return 0;
}

export default main();
