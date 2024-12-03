module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  let ans = 0

  const regex = /(do\(\)|don\'t\(\)|mul\((\d{1,3}\,\d{1,3})\))/g
  let doit = true

  inputs.forEach(line => {
    const matches = [...line.match(regex)]

    matches.forEach(match => {
      if (match === 'do()') {
        doit = true
      } else if (match === 'don\'t()') {
        doit = false
      } else if (isPart1 || doit) {
        const pair = match.slice(4,-1).split(',')
        
        ans += Number(pair[0]) * Number(pair[1])
      }
    });
  })

  return ans
}
