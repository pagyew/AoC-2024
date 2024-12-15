const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const solve = require('./solve')

const day = basename(__dirname)
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

console.log(`day ${day}`);

for (let part2 of [false,true]) {
  const part = part2 ? 'part 2' : 'part 1'
  
  console.time('time')
  
  const ans = solve({
    rawInput: input,
    inputs: input.split('\n'),
    isPart2: part2,
    isPart1: !part2
  })

  console.log('-'.repeat(10));
  console.log(`${part} answer: ${ans}`);
  
  console.timeEnd('time')
}
