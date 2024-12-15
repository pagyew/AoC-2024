module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = inputs[0].length
  let ans = 0

  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ]

  const matrix = inputs.map(line => line.split(''))

  function validCoords(y, x) {
    return x >= 0 && x < m && y >= 0 && y < n;
  }

  let dirIndex = 0;
  let [sy, sx] = [0, 0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === '^') {
        [sy, sx] = [i, j];
      }
    }
  }

  function move(y, x, dir) {
    const seen = Array.from({length: n}, () => Array.from({ length: m }, () => []));
    let count = 0;

    while (validCoords(y, x)) {
      if (isPart1 && seen[y][x].length === 0) {
        count++;
      }

      if (isPart2 && seen[y][x][dir]) {
        return 1;
      }

      seen[y][x][dir] = true;

      let [dy, dx] = dirs[dir];
      let [y1, x1] = [y + dy, x + dx];

      if (matrix[y1]?.[x1] === '#') {
        dir = (dir + 1) % dirs.length;
      } else {
        [y, x] = [y1, x1];
      }
    }

    return count;
  }

  if (isPart1) {
    ans = move(sy, sx, dirIndex);
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (['#', '^'].includes(matrix[i][j])) continue;
        
        matrix[i][j] = '#';
        ans += move(sy, sx, dirIndex);
        matrix[i][j] = '.';
      }
    }
  }

  return ans;
}
