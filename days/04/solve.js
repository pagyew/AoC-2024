module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = inputs[0].length
  let ans = 0

  const target = isPart1 ? 'XMAS' : 'MAS'
  const reversedTarget = target.split('').reverse().join('')
  const length = target.length
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ]

  function validCoords(y, x) {
    return x >= 0 && x < n && y >= 0 && y < m
  }

  function findWord1(j, i, k, y, x) {
    if (k === length) return 1

    if (validCoords(j, i) && inputs[j][i] === target[k]) {
      return findWord1(j + y, i + x, k + 1, y, x)
    }

    return 0
  }

  function findWord2(j, i) {
    const [a, ,b] = inputs[j - 1].slice(i - 1, i + 2)
    const [ ,c, ] = inputs[j].slice(i - 1, i + 2)
    const [d, ,e] = inputs[j + 1].slice(i - 1, i + 2)

    const first = a + c + e
    const second = b + c + d

    return (first === target || first === reversedTarget) &&
      (second === target || second === reversedTarget)
  }

  if (isPart1) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        for (let [y, x] of dirs) {
          ans += findWord1(i, j, 0, y, x)
        }
      }
    }
  } else {
    for (let i = 1; i < n - 1; i++) {
      for (let j = 1; j < m - 1; j++) {
          ans += findWord2(i, j)
      }
    }
  }

  return ans
}
