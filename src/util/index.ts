import {  readFileSync } from 'fs';
import * as path from 'path';

export const formatDay = (day: number | string) =>
  day.toString().padStart(2, '0');

/**
  * @typedef {Object} BaseSplitOptions
  * @property {string|RegExp} [delimiter='\n'] - a delimiter to split the input by
  * @property {boolean} [trim=true] - when true, trims each token after splitting
  * @property {boolean} [filterEmpty=true] - when true, filters out empty tokens after splitting/trim
  */
interface BaseSplitOptions {
  delimiter?: string | RegExp;
  /** When true, trims each token after splitting (default: true) */
  trim?: boolean;
  /** When true, filters out empty tokens after splitting/trim (default: true) */
  filterEmpty?: boolean;
}

type StringSplitOptions = BaseSplitOptions & { mapper: false };
type NumericSplitOptions = BaseSplitOptions & { mapper?: undefined };
type MappingSplitOptions<R> = BaseSplitOptions & {
  mapper: (e: string, i: number, a: string[]) => R;
};

export function parseInput(path: string): number[];
export function parseInput(path: string, options: { split: false }): string;
export function parseInput(path: string, options: { split: StringSplitOptions }): string[];
export function parseInput(path: string, options: { split: NumericSplitOptions }): number[];
export function parseInput<R>(path: string, options: { split: MappingSplitOptions<R> }): R[];
 /**
  * Parse the input from {day}/input.txt
  * @param {StringSplitOptions | NumericSplitOptions | MappingSplitOptions<unknown> | false} [split]
  */
export function parseInput(path: string, {
  split,
}: { split?: StringSplitOptions | NumericSplitOptions | MappingSplitOptions<unknown> | false } = {}) {
  const input = readFileSync(
    path,
    {
      encoding: 'utf-8',
    }
  );

  if (split === false) return input;

  const delimiter = split?.delimiter ?? '\n';
  const splitted = input.split(delimiter);
  const shouldTrim = split?.trim !== false; // default true
  const shouldFilterEmpty = split?.filterEmpty !== false; // default true

  let tokens = shouldTrim ? splitted.map((t) => t.trim()) : splitted;
  if (shouldFilterEmpty) tokens = tokens.filter((t) => t.length > 0);

  const mapper = (split as MappingSplitOptions<unknown> | StringSplitOptions | NumericSplitOptions | undefined)?.mapper as
    | ((e: string, i: number, a: string[]) => unknown)
    | false
    | undefined;

  return mapper === false
    ? (tokens as unknown as string[])
    : (tokens.map((...args) => (mapper?.(...(args as unknown as [string, number, string[]])) ?? Number(args[0]))) as unknown[]);
}
