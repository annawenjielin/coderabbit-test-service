## Usage

```
yarn start --day=DAY
```
- Where `0<DAY<11`
- E.g: To run day 7: `yarn start --day=7`

## Security Setup (Required)

⚠️ **Important**: This repository has been updated to follow security best practices based on CodeRabbit's recommendations.

### Environment Variables Setup

1. **Copy the environment template**:
   ```bash
   cp env.example .env
   ```

2. **Fill in your secure values** in `.env`:
   ```bash
   # User credentials for testing (use secure, non-production values)
   USER1_PASSWORD=your_secure_password_1
   USER2_PASSWORD=your_secure_password_2  
   USER3_PASSWORD=your_secure_password_3
   
   # API Configuration
   API_KEY=your_api_key_here
   SECRET_TOKEN=your_secret_token_here
   DATABASE_PASSWORD=your_db_password_here
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Never commit `.env` files** - they are automatically ignored by `.gitignore`

### Security Features Implemented

✅ **Removed hardcoded credentials** from source code  
✅ **Environment variable configuration** for sensitive data  
✅ **Comprehensive `.gitignore`** for secrets and config files  
✅ **Secure password validation** with strong requirements  
✅ **Cryptographically secure** session ID generation  
✅ **Input validation** and error handling

### Development Guidelines

- **Never commit secrets** to version control
- **Use environment variables** for all sensitive configuration
- **Rotate credentials** if accidentally exposed
- **Review security practices** regularly


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
In most cases, `[1, 2, 3]` is what we want, which is exactly what `parseInput()` would do (`parseInput({ split: { delim: '\n', mapper: (e) => Number(e) } }))` would also do the exact same).

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
