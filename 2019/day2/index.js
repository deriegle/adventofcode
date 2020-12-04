const fs = require('fs');
const path = require('path');

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .split(',') // Split each line to make an array for each line
    // .filter(Boolean) // Filter out any empty lines from editor or copying & pasting

  return lines
}

function processIntcodeProgram(i, fullProgram) {
  const [opcode, first, second, position] = fullProgram.slice(i, i + 4);

  switch(opcode) {
    case 1:
      // add
      fullProgram[position] = fullProgram[first] + fullProgram[second];
      return processIntcodeProgram(i + 4, fullProgram)
    case 2:
      // multiply
      fullProgram[position] = fullProgram[first] * fullProgram[second];
      return processIntcodeProgram(i + 4, fullProgram);
    case 99:
      return fullProgram;
    default:
      throw new Error(`Unexpected opcode: ${opcode}`)
  }
}

function replaceNounAndVerb(data, noun, verb) {
  data[1] = noun;
  data[2] = verb;
  return data;
}

function part1() {
  const data = parseFile().map((i) => parseInt(i))
  return processIntcodeProgram(0, replaceNounAndVerb(data, 12, 2))[0];
}

function part2() {
  const data = parseFile().map(i => parseInt(i));;
  const expectedOutput = 19690720
  const actual = [];

  // not optimized by any means :joy:
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let result = processIntcodeProgram(0, replaceNounAndVerb(data.slice(), noun, verb));

      if (result[0] === expectedOutput) {
        actual[0] = noun;
        actual[1] = verb;
        break;
      }
    }
  }

  const [noun, verb] = actual;

  return 100 * noun + verb;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
