const fs = require('fs');
const path = require('path');

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').split('\n').filter(Boolean);
  return lines;
}

function part1() {
  const data = parseFile();
  return;
}

function part2() {
  const data = parseFile();
  return;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
