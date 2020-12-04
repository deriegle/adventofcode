const fs = require('fs');
const path = require('path');

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .split('\n') // Split each line to make an array for each line
    .filter(Boolean); // Filter out any empty lines from editor or copying & pasting

  return lines.map((line) => {
    if (!line) { return null; }
    const [policy, letter, password] = line.split(' ');

    return {
      policy: policy.split('-'),
      letter: letter[0],
      password,
    };
  });
}

function part1() {
  const passwords = parseFile();
  const numberOfValidPasswords = passwords.reduce((acc, { policy, letter, password}) => {
    const letterCount = password.split(letter).length - 1;
    const isValid = letterCount >= policy[0] && letterCount <= policy[1];

    if (isValid) {
      acc += 1;
    }

    return acc;
  }, 0);

  console.log(numberOfValidPasswords);
}

function part2() {
  const passwords = parseFile();
  const numberOfValidPasswords = passwords.reduce((acc, { policy, letter, password}) => {
    const [firstPosition, secondPosition] = policy;
    const firstPositionHasCharacter = password[firstPosition - 1] === letter;
    const secondPositionHasCharacter = password[secondPosition - 1] === letter;
    const isValid = firstPositionHasCharacter && !secondPositionHasCharacter || !firstPositionHasCharacter && secondPositionHasCharacter;

    if (isValid) {
      acc += 1;
    }

    return acc;
  }, 0);

  console.log(numberOfValidPasswords);
}

part1();
part2();