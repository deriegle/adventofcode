const fs = require('fs');
const path = require('path');

class Passport {
  constructor(data) {
    this.data = data;
  }

  get isValid() {
    return this.hasRequiredKeys && !this.hasErrors;
  }

  get hasRequiredKeys() {
    const REQUIRED_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    return REQUIRED_KEYS.every((k) => Object.keys(this.data).includes(k))
  }

  get hasErrors() {
    const VALID_EYE_COLORS = ['amb','blu','brn','gry','grn','hzl','oth']
    const VALIDATIONS = {
      'byr': (input) => !!input.match(/\d{4}/) && parseInt(input) >= 1920 && input <= 2002,
      'cid': () => true,
      'ecl': (input) => VALID_EYE_COLORS.includes(input),
      'eyr': (input) => !!input.match(/\d{4}/) && parseInt(input) >= 2020 && parseInt(input) <= 2030,
      'hcl': (input) => !!input.match(/#([\da-f]{6})/),
      'hgt': (input) => this._isValidHeight(input),
      'iyr': (input) => !!input.match(/\d{4}/) && parseInt(input) >= 2010 && parseInt(input) <= 2020,
      'pid': (input) => !!input.match(/^\d{9}$/),
    };

    return Object.entries(this.data).filter(([key, value]) => !VALIDATIONS[key](value)).length
  }

  _isValidHeight(input) {
    const HEIGHT_VALIDATIONS = {
      'cm': (num) => num >= 150 && num <= 193,
      'in': (num) => num >= 59 && num <= 76,
    };

    const match = input.match(/(\d+)(cm|in)/);
    if (!match) { return false;}

    const [,number,units] = match;
    return HEIGHT_VALIDATIONS[units](number);
  }
}

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .split('\n\n') // Split each line to make an array for each line
    .filter(Boolean) // Filter out any empty lines from editor or copying & pasting
    .map((d) => Object.fromEntries(d.split('\n').join(' ').split(' ').map((s) => s.split(':'))))
    .map((d) => new Passport(d));

  return lines
}

function part1() {
  const data = parseFile();
  return data.filter((d) => d.hasRequiredKeys).length;
}

function part2() {
  const data = parseFile();
  return data.filter((d) => d.isValid).length;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
