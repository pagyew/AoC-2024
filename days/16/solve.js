const Heap = require('../../utils/heap');

module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length;
  const m = inputs[0].length;
  let ans = 0;
  let min = Infinity;
  let paths = [];

  const matrix = inputs.map(line => line.split(''));
  
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];

  const q = new Heap((a, b) => a.k - b.k);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 'S') {
        q.add({
          y: i,
          x: j,
          d: 1,
          k: 0,
          p: [[i, j]]
        });
      }
    }
  }

  function validCoords(y, x) {
    return x >= 0 && x < m && y >= 0 && y < n && matrix[y][x] !== '#';
  }

  const seen = Array.from({ length: n }, () => Array.from({ length: m }, () => []));

  while (q.size) {
    const {y, x, d, k, p} = q.pop();
    const codition = isPart1
      ? seen[y][x][d] <= k
      : seen[y][x][d] < k;

    if (codition) continue;
    
    seen[y][x][d] = k;

    if (matrix[y][x] === 'E') {
      if (min > k) {
        paths = p;
        min = k;
      } else if (isPart2 && min === k) {
        paths = paths.concat(p);
      }

      continue;
    }

    for (let i = 0; i < dirs.length; i++) {
      const [dy, dx] = dirs[i];
      const [y1, x1] = [y + dy, x + dx];
      const dk = i === d ? 1 : 1001;

      if (validCoords(y1, x1)) {
        q.add({
          y: y1,
          x: x1,
          k: k + dk,
          d: i,
          p: isPart2 && p.concat([[y1, x1]])
        });
      }
    }
  }

  ans = isPart1 ? min : new Set(paths.map(p => p.join())).size;

  return ans
}
