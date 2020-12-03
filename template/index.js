const fs = require('fs');
const path = require('path');

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .split('\n') // Split each line to make an array for each line
    .filter(Boolean) // Filter out any empty lines from editor or copying & pasting

  return lines
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
