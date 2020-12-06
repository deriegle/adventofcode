const fs = require("fs");
const path = require("path");

function parseFile(onlyYesAnswersFromWholeGroup) {
  const lines = fs
    .readFileSync(path.join(__dirname, "./input.txt"), "utf-8")
    .split("\n\n") // Split each line to make an array for each line
    .filter(Boolean) // Filter out any empty lines from editor or copying & pasting
    .map((s) => s.trim().split('\n'));
  
  return onlyYesAnswersFromWholeGroup
    ? lines.map((s) => s.map((c) => c.split('')))
    : lines.map((l) => l.join("").split(""));
}

function part1() {
  const data = parseFile(false);

  return data
    .map((d) => d.reduce((acc, d) => acc.add(d), new Set()))
    .map((s) => s.size)
    .reduce((acc, size) => acc + size, 0);
}

function part2() {
  const data = parseFile(true);

  return data
    .map((d) => d.reduce((acc, set) => acc.filter((e) => set.includes(e))).length)
    .reduce((acc, d) => acc + d, 0);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

// 6748
// 3445