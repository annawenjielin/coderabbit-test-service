import { formatDay } from './util';

const args = process.argv.slice(2);
const dayArg = args.find(arg => arg.startsWith('--day=')) || '--day=1';
const day = parseInt(dayArg.split('=')[1]) || 0;

console.log(`Running Day ${day}...`);

const outputSolution = () =>
  console.log(
    `Day ${day} - Solution: ${
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`./day${day}/index.ts`).default
    }`
  );

const validate = (type: 'day', num: number, max: number) => {
  if (num < 1 || num > max + 1)
    throw new Error(
      `The ${type} must be number between 1 and ${max}, you entered ${num}`
    );
};

validate('day', day, 25);

outputSolution();
