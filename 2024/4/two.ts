const file = await Deno.readTextFile("./2024/4/input.txt");

const matrix: Array<Array<string>> = file
  .split("\r\n")
  .map((row) => row.split(""));

const rows = matrix.length;
const cols = matrix[0].length;

const word = "MAS";

const directions = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

const crossCenterSet = new Set();
let score = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (matrix[r][c] != word[0]) continue;

    const queue: Array<[number, number, number]> = [];

    for (const [dr, dc] of directions) {
      queue.push([0, dr, dc]);
    }

    while (queue.length > 0) {
      const [pos, dr, dc] = queue.pop()!;
      const cr = r + dr * pos;
      const cc = c + dc * pos;
      if (cr < 0 || cc < 0 || cr >= rows || cc >= cols) continue;
      if (matrix[cr][cc] != word[pos]) continue;

      if (pos == word.length - 1) {
        if (crossCenterSet.has(JSON.stringify([r + dr, c + dc]))) {
          score += 1;
          continue;
        }
        crossCenterSet.add(JSON.stringify([r + dr, c + dc]));
        continue;
      }

      queue.push([pos + 1, dr, dc]);
    }
  }
}
console.log(score);
