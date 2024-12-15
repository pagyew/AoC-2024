module.exports = function({ inputs, rawInput, isPart1, isPart2 }) {
  const [warehouse, movements] = rawInput.split('\n\n')
  let ans = 0

  const rows = warehouse.split('\n');
  const matrix = rows.map(line => line.split(''));
  const moves = movements.split('\n').flatMap(line => line.split(''));
  const shift = isPart1 ? 0 : 1;
  const n = matrix.length;
  const m = matrix[0].length;
  const l = m * (isPart1 ? 1 : 2);

  const dirs = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1]
  };

  const robot = {y: 0, x: 0};
  const boxes = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (isPart2) {
        matrix[i][j*2] = rows[i][j];
        matrix[i][j*2 + 1] = rows[i][j];
      }

      if (rows[i][j] === '@') {
        robot.y = i;
        robot.x = isPart1 ? j : j*2;
      }

      if (rows[i][j] === 'O') {
        boxes.push({
          y: i,
          x: isPart1 ? j : j*2
        });
      }
    }
  }

  function validCoords(y, x, isRobot) {
    return x >= 0 && x < l - 1 && y >= 0 && y < n - 1
      && matrix[y][x] !== '#'
      && (isPart1 || isRobot || matrix[y][x+1] !== '#');
  }

  function collideWith(item, dir, isRobot) {
    const [dy, dx] = dirs[dir];
    const [y, x] = [item.y + dy, item.x + dx];
    let collides = [];
    
    boxes.forEach(other => {
      if (item === other) return;
      if (other.y !== y) return;
      if (isRobot && x < other.x) return;

      if (Math.abs(x - other.x) <= shift) {
        collides.push(other);
      }
    });

    return collides;
  }

  function tryMove(item, dir, isRobot) {
    const [dy, dx] = dirs[dir];
    const [y, x] = [item.y + dy, item.x + dx];
    let canMove = false;

    if (validCoords(y, x, isRobot)) {
      canMove = true;
    }

    if (canMove) {
      const collides = collideWith(item, dir, isRobot);

      canMove = collides.every(other => tryMove(other, dir, false));

      if (canMove) {
        collides.forEach(other => move(other, dir));
      }
    }

    return canMove;
  }

  function move(item, dir) {
    const [dy, dx] = dirs[dir];
    const [y, x] = [item.y + dy, item.x + dx];

    item.y = y;
    item.x = x;
  }

  for (let i = 0; i < moves.length; i++) {
    const dir = moves[i];
    const canMove = tryMove(robot, dir, true);

    if (canMove) {
      move(robot, dir);
    }
  }

  for (let box of boxes) {
    ans += box.y * 100 + box.x;
  }

  return ans;
}
