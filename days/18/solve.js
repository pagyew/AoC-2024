module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const m = 71
  let uses = isPart1 ? 1024 : n
  const end = [70, 70]
  let ans = 0

  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ]

  const bytes = inputs.map(line => line.split(',').map(Number))

  function find() {
    const corrupted = new Set(bytes.slice(0, uses).map(byte => byte.join()))
    const q = [[0, 0, 0]]
    const seen = new Set()
    
    while (q.length) {
      const [x, y, k] = q.shift()
      const [endX, endY] = end
      const key = [x, y].join()
  
      if (y === endY && x === endX) {
        return k
      }
  
      if (corrupted.has(key) || seen.has(key)) {
        continue
      }
  
      seen.add(key)
  
      dirs.forEach(([dx, dy]) => {
        const newX = x + dx
        const newY = y + dy
  
        if (x >= 0 && x < m && y >= 0 && y < m) {
          q.push([newX, newY, k + 1])
        }
      })
    }

    return 0
  }

  if (isPart1) {
    ans = find()
  } else {
    do {
      ans = bytes[--uses].join()
    } while (find() === 0)
  }

  return ans
}
