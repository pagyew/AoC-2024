module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = rawInput.length
  let ans = 0

  const fs = [];
  
  for (let i = 0; i < n; i++) {
    fs.push({
      id: i % 2 ? '.' : i / 2,
      count: Number(rawInput[i])
    });
  }

  let left = 0;
  let right = fs.length - 1;
  
  while (left < right) {
    while (fs[right].id === '.') {
      right--;
    }

    while (fs[left].id !== '.' || (isPart2 && (fs[left].count < fs[right].count))) {
      left++;
    }

    if (right < left) {
      if (isPart2) {
        left = 0;
        right--;
      }

      continue;
    }

    if (fs[left].count === fs[right].count) {
      [fs[left], fs[right]] = [fs[right], fs[left]];
    } else if (fs[left].count > fs[right].count) {
      fs.splice(left, 0, {...fs[right]});
      left++;
      right++;
      fs[left].count -= fs[right].count;
      fs[right].id = '.';
    } else {
      if (isPart1) {
        fs.splice(right + 1, 0, {...fs[left]});
        fs[right].count -= fs[left].count;
        fs[left].id = fs[right].id;
      }
    }
    
    if (isPart2) {
      left = 0;
    }
  }

  const result = fs.flatMap(f => Array(f.count).fill(f.id));

  for (let i = 0; i < result.length; i++) {
    if (result[i] !== '.') {
      ans += result[i] * i;
    }
  }

  return ans
}
