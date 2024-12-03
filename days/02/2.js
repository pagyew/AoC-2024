const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

var largestIncreasingSubset = function(X) {
  const n = X.length
  const D = Array(n).fill(1)
  const P = Array(n).fill(-1)
  let maxIndex = 0
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (X[i] > X[j] && X[i] - X[j] <= 3 && D[i] < D[j] + 1) {
        D[i] = D[j] + 1
        P[i] = j
      }
    }
    
    if (D[i] > D[maxIndex]) {
      maxIndex = i
    }
  }
    
  const ans = []
  
  for (let i = maxIndex; i != -1; i = P[i]) {
    ans.unshift(X[i])
  }
    
  return ans
};

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
  
  const n = input.length
  const compare = part2 ? 1 : 0
  let ans = 0

  const lines = input.map(line => line.split(/\s+/).map(Number))

  lines.forEach((line, i) => {
    const lisAsc = largestIncreasingSubset(line)
    const lisDesc = largestIncreasingSubset(line.toReversed())
    const al = line.length - lisAsc.length
    const dl = line.length - lisDesc.length

    if (al <= compare || dl <= compare) {
      ans++
    }
  })

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}
