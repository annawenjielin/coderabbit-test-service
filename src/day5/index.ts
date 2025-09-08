import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"));

function main() {
  console.log(input);
  return 0;
}

export default main();
