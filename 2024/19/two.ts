const file = await Deno.readTextFile("./2024/19/input.txt");

const [towelsString, patternString] = file.split("\r\n\r\n");

const towels = towelsString.split(", ");
const patterns = patternString.split("\r\n");

const memo = new Map<string, number>();

function dp(curr: string[], desired: string): number {
  const remaining = desired.substring(curr.join("").length);
  if (curr.join("") == desired) return 1;
  if (memo.has(remaining)) return memo.get(remaining)!;
  let res: number = 0;
  for (const towel of towels) {
    if (!desired.startsWith(curr.join("") + towel)) continue;
    res += dp([...curr, towel], desired);
  }
  memo.set(remaining, res);
  return res;
}

let count = 0;

for (const pattern of patterns) {
  count += dp([], pattern);
}

console.log(count);
