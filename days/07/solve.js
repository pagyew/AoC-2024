module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  let ans = 0

  const operations = [
    (a, b) => +a + +b,
    (a, b) => +a * +b,
  ]

  if (isPart2) {
    operations.push((a, b) => Number(a + b))
  }

  const lines = inputs.map(line => {
    const [target, numbers] = line.split(': ')

    return [Number(target), numbers.split(' ')]
  })

  function check(target, current, index, numbers) {  
    if (index === numbers.length) {
      return current === target ? target : 0;
    }

    if (current > target) {
      return 0
    }

    for (let operation of operations) {
      const result = check(target, operation(current, numbers[index]), index + 1, numbers)

      if (result) return result
    }

    return 0;
  }

  ans = lines.reduce((acc, [target, numbers]) => acc + check(target, 0, 0, numbers), 0);

  return ans
}
