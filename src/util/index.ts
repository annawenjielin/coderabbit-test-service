import { readFileSync } from 'fs';
// import * as path from 'path'; // Commented out unused import

export const formatDay = (day: number | string) =>
  day.toString().padStart(2, '0');

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a delimeter to split the input by (false will omit the splitting and return the entire input)
 * @property {funcion(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export function parseInput(path: string): number[];
export function parseInput(path: string, options: { split: false }): string;
export function parseInput(
  path: string,
  options: {
    split: { delimiter?: string; mapper: false };
  },
): string[];
export function parseInput(
  path: string,
  options: { split: { delimiter: string } },
): number[];
export function parseInput<T>(
  path: string,
  options: { split: SplitOptions<T> },
): T[];
/**
 * Read a UTF-8 text file and optionally split and map its contents.
 *
 * Reads the file at `path`. If `split` is strictly `false`, the raw file
 * contents are returned. Otherwise the file is split using `split.delimiter`
 * (defaulting to newline) and one of:
 * - if `split.mapper === false`: returns the array of split strings (string[]).
 * - if `split.mapper` is a function: returns the result of `split.mapper` for
 *   each split item (`T[]`).
 * - if no mapper is provided: each split item is converted with `Number(item)`
 *   and returned as `number[]` (or `NaN` when conversion fails).
 *
 * @param path - Filesystem path to read (UTF-8).
 * @param split - Controls splitting and mapping:
 *   - `false` => return raw file string.
 *   - `{ delimiter?: string; mapper: false }` => return string[] split by `delimiter` (default '\n').
 *   - `{ delimiter?: string }` => split then convert each item with `Number`.
 *   - `SplitOptions<T>` with a `mapper` function => map each split item to `T`.
 * @returns The raw string, an array of strings, numbers, or mapped values depending on `split`.
 */
export function parseInput<T>(
  path: string,
  { split }: { split?: SplitOptions<T> | false } = {},
) {
  const input = readFileSync(path, {
    encoding: 'utf-8',
  });

  if (split === false) return input;

  const splitted = input.split(split?.delimiter ?? '\n');
  const mapper = split?.mapper;

  return mapper === false
    ? splitted
    : splitted.map((...args) => mapper?.(...args) ?? Number(args[0]));
}
