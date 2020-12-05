const fs = require('fs');
const path = require('path');

class BoardingPass {
  constructor(str) {
    this.row = this._calculateRow(str);
    this.column = this._calculateColumn(str);
  }

  get seatId() {
    return this.row * 8 + this.column;
  }

  _calculateRow(originalStr) {
    const str = originalStr.slice(0, 7).split('');
    const rows = new Array(128).fill(1).map((_, i) => i);
    return this._decodeBinarySpacePartition(str, rows)
  }

  _calculateColumn(fullStr) {
    const str = fullStr.slice(7).split('');
    const columns = [0, 1, 2, 3, 4, 5, 6, 7];
    return this._decodeBinarySpacePartition(str, columns);
  }

  _decodeBinarySpacePartition(str, rows) {
    if (rows.length === 1) { return rows[0]; }

    const half = Math.floor(rows.length / 2);
    const [s] = str;

    if (s === 'F' || s == 'L') {
      return this._decodeBinarySpacePartition(str.slice(1), rows.slice(0, half));
    } else {
      return this._decodeBinarySpacePartition(str.slice(1), rows.slice(half));
    }
  }
}

const byNumber = (bp1, bp2) => bp1.seatId > bp2.seatId ? -1 : 1;

function parseFile() {
  const lines =  fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .split('\n') // Split each line to make an array for each line
    .filter(Boolean) // Filter out any empty lines from editor or copying & pasting
    .map((str) => new BoardingPass(str))
    .sort(byNumber)
    .map((bp) => bp.seatId)

  return lines
}

function part1() {
  const [seatId] = parseFile();
  return seatId;
}

function part2() {
  const boardingPasses = parseFile();

  for (let i = 1; i < boardingPasses.length - 1; i++) {
    const [previous, current, next] = boardingPasses.slice(i - 1, i + 2);

    if (previous != current + 1) { return current + 1; }
    if (next != current - 1) { return current - 1; }
  }
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
