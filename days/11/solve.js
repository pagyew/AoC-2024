module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  let ans = 0

  let stones = inputs[0].split(' ').map(Number);
  let k = isPart1 ? 25 : 75;

  const seen = new Map();

  function count(stone, i) {
    if (i === 0) return 1;
    
    const key = [stone, i].join();
    
    if (seen.has(key)) return seen.get(key);
    
    let c = 0;
    let variants = [];

    if (stone === 0) {
      variants.push(1);
    } else {
      const len = Math.ceil(Math.log10(stone + 1));

      if (len % 2 === 0) {
        variants.push(stone / Math.pow(10, len / 2) | 0);
        variants.push(stone % Math.pow(10, len / 2));
      } else {
        variants.push(stone * 2024);
      }
    }

    for (let variant of variants) {
      c += count(variant, i - 1);
    }

    seen.set(key, c);

    return c;
  }

  ans = stones.reduce((acc, stone) => acc + count(stone, k), 0);

  return ans
}
