## Usage

```
yarn start --day=DAY
```

- Where `0<DAY<11`
- E.g: To run day 7: `yarn start --day=7`

## Util

> The `parseInput` function is already imported and called at the top of each file.

By default, the function will return the `input.txt` (for the according day which is determined by the flag mentioned above) splitted by `'\n'` as the delimiter and it will also be mapped into numbers by default.

This behaviour can be modified by overriding these options via the [`SplitOptions`](https://github.com/izexi/aoc-ts-template/blob/master/src/util/index.ts#L3-L11) param, here are some examples to illustrate that:

Let's say the `input.txt` looks like

```
1
2
3
```

In most cases, `[1, 2, 3]` is what we want, which is exactly what `parseInput()` would do (`parseInput({ split: { delimiter: '\n', mapper: (e) => Number(e) } }))` would also do the exact same).

---

Now, let's say the input looked like

```
A
B
C
```

Obviously, we don't want the `SplitOptions.mapper` to be `Number` (which is the default), so we can override this like so: `parseInput({ split: { mapper: false } })`. This would split the input by the default `'\n'` and since we passed `false` it would not map the splitted string.

---

There may also be inputs where the delimiter new lines like so

```
1 2 3
```

As shown above the delimiter here is infact `' '` which we can pass as the `SplitOptions.delimiter` and since we probably want to map that into numbers we don't need to worry about setting the `mapper` property since that is what it does by default: `parseInput({ split: { delimiter: ' ' } })`

---

Lastly, there may be an input that we don't want to modify at all and just handle the raw input such as

```
ABC
```

We can get that by doing: `parseInput({ split: false })`

---

There may a scenrio where we need to map each item in the input, for example let's say that we wanted to double each number:

```
1
2
3
```

We can do that like so: `parseInput({ split: { mapper: (n) => Number(n) * 2 } })`, the parameters of the function is identical to how it would be with [`Array#map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Syntax) (and it will be passed into map in the same way) which is `(e: string, i: number, a: string[])`.

---

### Extended options

`parseInput` now supports additional options to make parsing more robust:

- `split.delimiter?: string | RegExp` — You can pass a regular expression as the delimiter.
- `split.trim?: boolean` — When `true` (default), trims each token after splitting.
- `split.filterEmpty?: boolean` — When `true` (default), filters out empty tokens after splitting/trim.

Examples:

1. Handle mixed whitespace and blank lines (defaults trim/filterEmpty):

```ts
const input = parseInput(path.join(__dirname, "input.txt"));
// With default mapper Number, this yields number[] even if lines contain spaces or blanks
```

2. Split on commas or whitespace using RegExp and keep raw strings:

```ts
const input = parseInput(path.join(__dirname, "input.txt"), {
  split: { delimiter: /[,\s]+/, mapper: false },
});
// string[] with empty tokens removed and tokens trimmed by default
```
