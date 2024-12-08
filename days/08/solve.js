module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = inputs[0].length
  let ans = 0

  const antennas = {};
  const antinodes = new Set();

  function validCoords([y, x]) {
    return x >= 0 && x < m && y >= 0 && y < m;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const antenna = inputs[i][j];

      if (antenna !== '.') {
        antennas[antenna] ??= [];
        antennas[antenna].push([i, j]);
      }
    }
  }

  for (let antenna in antennas) {
    const coords = antennas[antenna];
    const k = coords.length;

    for (let i = 0; i < k - 1; i++) {
      const [y1, x1] = coords[i];

      for (let j = i + 1; j < k; j++) {
        let [y2, x2] = coords[j];
        const [yDiff, xDiff] = [y1 - y2, x1 - x2];
        let [nY1, nX1] = [y1 + yDiff, x1 + xDiff];
        let [nY2, nX2] = [y2 - yDiff, x2 - xDiff];

        if (isPart2) {
          antinodes.add([y1, x1].join());
          antinodes.add([y2, x2].join());
        }

        while (validCoords([nY1, nX1])) {
          antinodes.add([nY1, nX1].join());

          if (isPart1) break;

          [nY1, nX1] = [nY1 + yDiff, nX1 + xDiff];
        }
        
        while (validCoords([nY2, nX2])) {
          antinodes.add([nY2, nX2].join());

          if (isPart1) break;

          [nY2, nX2] = [nY2 - yDiff, nX2 - xDiff];
        }
      }
    }
  }

  ans = antinodes.size;

  return ans
}
