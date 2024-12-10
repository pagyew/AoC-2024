module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = inputs[0].length
  let ans = 0

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  const lines = inputs.map(line => line.split('').map(Number));

  const visited = new Set();

  function validCoords(y, x) {
    return x >= 0 && x < m && y >= 0 && y < n;
  }

  function calc(y, x, current, sY, sX) {
    let count = 0;

    if (lines[y][x] === 9) {
      const key = [sY, sX, y, x].join();
      const isVisited = visited.has(key);
      
      visited.add(key);

      return isPart1 ? +!isVisited : 1;
    }

    for (let [dy, dx] of dirs) {
      const [newY, newX] = [y + dy, x + dx];

      if (validCoords(newY, newX) && lines[newY][newX] === current + 1) {
        count += calc(newY, newX, current + 1, sY, sX);
      }
    }

    return count;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (lines[i][j] === 0) {
        ans += calc(i, j, 0, i, j);
      }
    }
  }

  return ans
}
