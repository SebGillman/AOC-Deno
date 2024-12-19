const file = await Deno.readTextFile("./2024/19/input.txt");

const [towelsString, patternString] = file.split("\r\n\r\n");

const towels = towelsString.split(", ");
const patterns = patternString.split("\r\n");

const visited = new Set<string>();

function dp(curr: string, desired: string): boolean {
  if (curr.length == desired.length) return curr == desired;
  let res = false;
  for (const towel of towels) {
    visited.add(curr + towel);
    if (!desired.startsWith(curr + towel)) continue;
    res = res || dp(curr + towel, desired);
  }
  return res;
}

let count = 0;

for (const pattern of patterns) {
  if (visited.has(pattern)) {
    count++;
    continue;
  }
  count += dp("", pattern) ? 1 : 0;
}

console.log(count);
