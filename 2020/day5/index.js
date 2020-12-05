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

  _calculateRow(str) {
    const rowRegions = str.slice(0, 7).split('');

    let rows = new Array(128).fill(1).map((_, i) => i);

    for (const rowRegion of rowRegions) {
      const halfRow = Math.floor(rows.length / 2);

      rows = rowRegion === 'F'
        ? rows.slice(0, halfRow) // top half
        : rows.slice(halfRow); // back half
    }

    return rows[0];
  }

  _calculateColumn(str) {
    const columnRegions = str.slice(7).split('');

    let columns = [0, 1, 2, 3, 4, 5, 6, 7];

    for (const columnRegion of columnRegions) {
      const halfColumn = Math.floor(columns.length / 2);

      columns = columnRegion === 'L'
        ? columns.slice(0, halfColumn) // left half
        : columns.slice(halfColumn); // right half
    }

    return columns[0];
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
