module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const n = inputs.length
  const seconds = 100;
  const h = 103;
  const w = 101;
  const hm = h / 2 | 0;
  const wm = w / 2 | 0;
  let ans = isPart1 ? 0 : 7569;

  const robots = inputs.map(line => {
    const regex = /p\=(\d+),(\d+) v\=(\-?\d+),(\-?\d+)/

    const [x, y, dx, dy] = line.match(regex).slice(1).map(Number);

    return {x, y, dx, dy};
  });

  const quadrants = [0, 0, 0, 0];
  
  if (isPart1) {
    robots.forEach(robot => {
      robot.x = (robot.x + robot.dx * seconds) % w;
      robot.y = (robot.y + robot.dy * seconds) % h;
  
      if (robot.y < 0) {
        robot.y += h;
      }
  
      if (robot.x < 0) {
        robot.x += w;
      }

      if (robot.y < hm && robot.x < wm) {
        quadrants[0]++;
      }
  
      if (robot.y < hm && robot.x > wm) {
        quadrants[1]++;
      }
  
      if (robot.y > hm && robot.x < wm) {
        quadrants[2]++;
      }
  
      if (robot.y > hm && robot.x > wm) {
        quadrants[3]++;
      }
    });
  } else {
    for (let i = 1; i <= ans; i++) {
      robots.forEach(robot => {
        robot.x = (robot.x + robot.dx) % w;
        robot.y = (robot.y + robot.dy) % h;
  
        if (robot.y < 0) {
          robot.y += h;
        }
  
        if (robot.x < 0) {
          robot.x += w;
        }
      });
    }

    const matrix = Array.from({ length: h }, () => Array(w).fill(' '));

    robots.forEach(robot => {
      matrix[robot.y][robot.x] = '■';
    });

    console.log(matrix.map(line => line.join('')).join('\n'));
  }

  ans = isPart1
    ? quadrants.reduce((a, b) => a * b, 1)
    : ans;

  return ans
}
