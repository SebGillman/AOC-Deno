const file = await Deno.readTextFile("./2024/7/input.txt");

const lines = file.split("\r\n");

let res = 0;

let numbers: Array<number> = [];
let testVal: number;

function possibleOperators(curr: number, index: number): boolean {
  // console.log(curr, numbers[index], parseInt(`${curr}${numbers[index]}`));
  if (curr > testVal) return false;
  if (index == numbers.length) return curr == testVal;

  return (
    possibleOperators(curr + numbers[index], index + 1) ||
    possibleOperators(curr * numbers[index], index + 1) ||
    possibleOperators(parseInt(`${curr}${numbers[index]}`), index + 1)
  );
}

for (const line of lines) {
  const [testValString, numString] = line.split(": ");
  testVal = parseInt(testValString);
  numbers = numString.split(" ").map((num) => parseInt(num));

  //   console.log(testVal, numbers);
  if (possibleOperators(numbers[0], 1)) res += testVal;
}

console.log(res);
