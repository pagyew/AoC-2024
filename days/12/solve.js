module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = inputs[0].length
  let ans = 0

  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];

  const matrix = inputs.map(line => line.split(''));
  const seen = Array.from({ length: n }, () => Array(m).fill(false));

  function validCoords(y, x) {
    return x >= 0 && x < m && y >= 0 && y < n;
  }

  function check(y, x, name) {
    if (validCoords(y, x)) {
      return name === matrix[y][x];
    }

    return false;
  }

  function dfs(i, j, name, key) {
    if (seen[i][j]) return;
    
    areas[key].s++;
    seen[i][j] = true;
    
    dirs.forEach(([dy, dx], index) => {
      const [y, x] = [i + dy, j + dx];
      
      if (check(y, x, name)) {
        dfs(y, x, name, key);
      } else {
        areas[key].p[index].push([y, x]);
      }
    });
  }

  function countLines(arr) {
    let lines = 1;

    arr.forEach(([y, x], i) => {
      if (i === 0) return;

      if (y !== arr[i - 1][0] || x - 1 !== arr[i - 1][1]) {
        lines++;
      }
    });

    return lines;
  }

  const areas = {};

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (seen[i][j]) continue;

      const name = matrix[i][j];
      const key = [i, j].join();

      areas[key] ??= {
        p: Array.from({ length: dirs.length }, () => []),
        s: 0
      };

      dfs(i, j, name, key);
    }
  }

  for (const key in areas) {
    const {p, s} = areas[key];
    let sides = 0;

    if (isPart1) {
      sides = p.flat().length;
    } else {
      p.forEach((points, index) => {
        const lines = index % 2
          ? points.sort((a, b) => a[1] - b[1] || a[0] - b[0]).map(([y, x]) => [x, y])
          : points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

        sides += countLines(lines);
      });
    }

    ans += s * sides;
  }

  return ans
}
