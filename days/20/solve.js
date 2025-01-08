module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = inputs[0].length
  const cheats = isPart1 ? 2 : 20
  const saves = 100
  let ans = 0

  const matrix = inputs.map(line => line.split(''))
  let start = [0, 0]
  let end = [0, 0]

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 'S') {
        start = [i, j]
      } else if (matrix[i][j] === 'E') {
        end = [i, j]
      }
    }
  }

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]

  function validCoords(y, x) {
    return x >= 0 && x < m && y >= 0 && y < n;
  }

  const cache = Array.from({ length: n }, () => Array(m).fill(-1))

  function findFair(y, x) {
    const [targetY, targetX] = start
    const q = [[y, x, 0]]

    while (q.length) {
      const [y, x, d] = q.shift()

      if (y === targetY && x === targetX) {
        cache[y][x] = d
        return d
      }

      if (cache[y][x] !== -1) {
        continue
      }

      cache[y][x] = d

      dirs.forEach(([dy, dx]) => {
        const newY = y + dy
        const newX = x + dx

        if (
          validCoords(newY, newX) &&
          matrix[newY][newX] !== '#'
        ) {
          q.push([newY, newX, d + 1])
        }
      })
    }

    return result
  }

  function findUnfair(y, x, d, c, seen, done) {    
    const q = [[y, x, d, c]]

    while (q.length) {
      const [y, x, d, c] = q.shift()

      if (c > cheats) {
        continue
      }
  
      if (cache[y][x] !== -1) {
        const diff = d - cache[y][x] - c
  
        if (diff > 0) {
          done[y][x].push(diff)
        }
      }

      dirs.forEach(([dy, dx]) => {
        const newY = y + dy
        const newX = x + dx
  
        if (validCoords(newY, newX) && !seen[newY][newX]) {
          seen[newY][newX] = true
          q.push([newY, newX, d, c + 1])
        }
      })
    }
  }

  findFair(...end)

  const unfairs = []
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (cache[i][j] !== -1) {
        const d = cache[i][j]
        const seen = Array.from({ length: n }, () => Array(m).fill(false))
        const done = Array.from({ length: n }, () => Array.from({ length: m }, () => []))

        cache[i][j] = -1

        findUnfair(i, j, d, 0, seen, done)
        
        done.forEach(row =>
          row.forEach(v =>
            new Set(v).forEach(w => {
              unfairs[w] ??= 0
              unfairs[w]++
            })
          )
        )
        
        cache[i][j] = d
      }
    }
  }

  ans = unfairs.reduce((a, b, i) => b && i >= saves ? a + b : a, 0)

  return ans
}
