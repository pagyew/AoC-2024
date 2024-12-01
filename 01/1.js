const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
  
  const n = input.length
  let ans = 0

  const lefts = []
  const rights = []
  const similars = []

  input.forEach(line => {
    const [l, r] = line.split(/\s+/);

    lefts.push(+l)
    rights.push(+r)
    
    if (part2) {
      similars[+r] = (similars[+r] ?? 0) + 1
    }
  })

  if (!part2) {
    lefts.sort((a, b) => a - b)
    rights.sort((a, b) => a - b)
  }

  for (let i = 0; i < n; i++) {
    const l = lefts[i]
    const r = rights[i]

    if (part2) {
      ans += l * (similars[l] ?? 0)
    } else {
      ans += Math.abs(l - r)
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
