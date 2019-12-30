const space = ' ';
const vbar = '|';
const plus = '+';
const dash = '-';

function draw(grid) {
  console.log(grid);
  const line = plus + dash.repeat(grid[0].length * 3) + plus;
  process.stdout.write(line + '\n');
  grid.forEach((row, i) => {
    process.stdout.write(vbar);
    row.forEach((col, j) => {
      const val = grid[i][j];
      process.stdout.write(space + val + space);
    })
    process.stdout.write(vbar + '\n');
    process.stdout.write(line + '\n');
  })
}

function make(n, m) {
  const grid = [];
  let startVal = 0;
  for (let i = 0; i < n; i += 1) {
    const row = [];
    let val = startVal;
    for (let j = 0; j < m; j += 1) {
      row[j] = val;
      val = Number(!val);
    }
    grid[i] = row;
    startVal = Number(!startVal);
  }
  return grid;
}

function main() {
  draw(make(5, 5));
}

main();
