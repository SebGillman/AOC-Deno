const file = await Deno.readTextFile("./2024/1/input.txt");

const arr1: number[] = [];
const arr2: number[] = [];

const lines: string[] = file.split("\r\n");
lines.forEach((line: string) => {
  const split: string[] = line.split(" ");
  arr1.push(parseInt(split[0]));
  arr2.push(parseInt(split[split.length - 1]));
});

const sorted1 = arr1.sort();
const sorted2 = arr2.sort();

let score = 0;
for (let i = 0; i < sorted1.length; i++) {
  score += Math.abs(sorted1[i] - sorted2[i]);
}
console.log(score);