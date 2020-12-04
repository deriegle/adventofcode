const fs = require('fs');
const path = require('path');

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .split('\n') // Split each line to make an array for each line
    .filter(Boolean) // Filter out any empty lines from editor or copying & pasting

  return lines
}

function calculateFuelRequirement(mass, recursive) {
  let fuelRequirement =  Math.max(Math.floor(parseInt(mass) / 3) - 2, 0);

  if (recursive) {
    let i = fuelRequirement;

    while (i > 0) {
      const next = calculateFuelRequirement(i);
      fuelRequirement += next;
      i = next;
    }
  }

  return fuelRequirement;
}

function part1() {
  const data = parseFile();
  return data.reduce((acc, mass) => acc + calculateFuelRequirement(mass), 0);
}

function part2() {
  const data = parseFile();

  return data.reduce((acc, mass) => acc + calculateFuelRequirement(mass, true), 0);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
