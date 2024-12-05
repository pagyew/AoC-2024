module.exports = function({ rawInput, isPart1, isPart2 }) {
  const [rawRules, rawLines] = rawInput.split('\n\n')
  const rules = rawRules.split('\n').map(rule => rule.split('|').map(Number))
  const lines = rawLines.split('\n').map(line => line.split(',').map(Number))
  const n = lines.length
  let ans = 0

  const sortOrders = new Map()

  rules.forEach(rule => {
    sortOrders.set(rule.join(), -1)
    sortOrders.set(rule.toReversed().join(), 1)
  })

  lines.forEach(line => {
    const sorted = line.toSorted((a, b) => sortOrders.get([a, b].join()) ?? 0)

    if (isPart1 && sorted.join() === line.join()) {
      ans += line[line.length / 2 >> 0]
    }

    if (isPart2 && sorted.join() !== line.join()) {
      ans += sorted[sorted.length / 2 >> 0]
    }
  })

  return ans
}
