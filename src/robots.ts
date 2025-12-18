type Dir = 'N' | 'S' | 'E' | 'W';

interface Grid {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface RobotPos {
  x: number;
  y: number;
  dir: Dir;
}

export const turnLeft = (dir: Dir): Dir => {
  const map: Record<Dir, Dir> = { N: 'W', W: 'S', S: 'E', E: 'N' };
  return map[dir];
};

export const turnRight = (dir: Dir): Dir => {
  const map: Record<Dir, Dir> = { N: 'E', E: 'S', S: 'W', W: 'N' };
  return map[dir];
};

export const moveRobot = (pos: RobotPos): RobotPos => {
  console.log('🚀 ~ moveRobot ~ pos:', pos);
  const map: Record<Dir, [number, number]> = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
  };
  const [dx, dy] = map[pos.dir];
  return { x: pos.x + dx, y: pos.y + dy, dir: pos.dir };
};

export const isOffGrid = (pos: RobotPos, g: Grid) =>
  pos.x < g.minX || pos.x > g.maxX || pos.y < g.minY || pos.y > g.maxY;

export const processInstructions = (grid: Grid, start: RobotPos, instructions: string[]) => {
  let currPos = { ...start };
  let lost = false;

  for (const move of instructions) {
    if (lost) break;

    if (move === 'L') currPos.dir = turnLeft(currPos.dir);

    if (move === 'R') currPos.dir = turnRight(currPos.dir);

    if (move === 'F') {
      const nextPos = moveRobot(currPos);

      if (isOffGrid(nextPos, grid)) {
        lost = true;
        break;
      }

      currPos = nextPos;
    }
  }

  return `${currPos.x} ${currPos.y} ${currPos.dir}${lost ? ' LOST' : ''}`;
};
