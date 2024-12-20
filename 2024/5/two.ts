const file = await Deno.readTextFile("./2024/5/input.txt");

const rows: Array<string> = file.split("\r\n");

const splitIndex = rows.indexOf("");

const rules = rows.slice(0, splitIndex);
const changes = rows.slice(splitIndex + 1).map((row) => row.split(","));

// handle rules

const ruleMap = new Map<string, Array<string>>();

for (const rule of rules) {
  const [a, b] = rule.split("|");
  if (!ruleMap.has(b)) {
    ruleMap.set(b, []);
  }
  ruleMap.get(b)?.push(a);
}

// handle updates

let score = 0;

function checkUpdate(pages: Array<string>): boolean {
  const illegalPages = new Set<string>();
  for (const page of pages) {
    if (illegalPages.has(page)) {
      return false;
    }
    ruleMap.get(page)?.forEach((el) => illegalPages.add(el));
  }
  return true;
}

function getSet(pages: Array<string>) {
  const res = new Set();
  for (const e of pages) {
    ruleMap.get(e)?.forEach((el) => res.add(el));
  }
  return res;
}

function sort(pages: Array<string>): number {
  let l = 0;

  while (l < pages.length) {
    const a = pages[l];

    if (getSet(pages.slice(0, l)).has(a)) {
      pages[l] = pages[l - 1];
      pages[l - 1] = a;
      l -= 1;
    } else {
      l += 1;
    }
  }
  const mid = pages[Math.round(pages.length / 2) - 1];
  return parseInt(mid);
}

for (const pages of changes) {
  if (checkUpdate(pages)) continue;
  score += sort(pages);
}
console.log(score);
