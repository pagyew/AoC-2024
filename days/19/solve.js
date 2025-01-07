module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  let ans = 0

  const [a, b] = rawInput.split('\n\n')
  const towels = a.split(', ')
  const patterns = b.split('\n')

  function dfs(pattern, i = 0, cache = new Map()) {
    let result = 0

    if (cache.has(i)) {
      return cache.get(i)
    }

    if (i === pattern.length) {
      return 1
    }

    for (let towel of towels) {
      if (towel === pattern.slice(i, i + towel.length)) {
        result += dfs(pattern, i + towel.length, cache)
      }

      if (isPart1 && result) {
          return result
      }
    }

    cache.set(i, result)
   
    return result
  }

  for (let pattern of patterns) {
    ans += dfs(pattern)
  }

  return ans
}
