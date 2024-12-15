const nerdamer = require('../../utils/nerdamer');

nerdamer.set('SOLUTIONS_AS_OBJECT', true);

module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const costA = 3;
  const costB = 1;
  const shift = isPart1 ? 0 : 10000000000000;
  let ans = 0
  
  const tasks = rawInput.split('\n\n').map(line => {
    const [a, b, p] = line.split('\n');
    const regexButton = /X\+(\d+), Y\+(\d+)/;
    const regexPrize = /X\=(\d+), Y\=(\d+)/;
    
    const [aX, aY] = a.match(regexButton).slice(1).map(Number);
    const [bX, bY] = b.match(regexButton).slice(1).map(Number);
    const [pX, pY] = p.match(regexPrize).slice(1).map(Number);
    
    return {
      a: {x: aX, y: aY},
      b: {x: bX, y: bY},
      p: {x: pX + shift, y: pY + shift}
    };
  });

  function resolveExpression(a, b, p) {
    const first = `${a.x}x+${b.x}y=${p.x}`;
    const second = `${a.y}z+${b.y}w=${p.y}`;
    const third = `x=z`;
    const fourth = `y=w`;

    const solution = nerdamer.solveEquations([first, second, third, fourth]);

    if (Number.isInteger(solution.x) && Number.isInteger(solution.y)) {
      return solution
    };
  }

  for (let task of tasks) {
    const { a, b, p } = task;
    const solution = resolveExpression(a, b, p);

    if (solution) {
      ans += solution.x * costA + solution.y * costB;
    }
  }

  return ans
}
