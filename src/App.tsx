import './App.css';

const baseInput = `
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
`;

// 1 1 E
// 3 3 N LOST
// 2 3 S

type Dir = 'N' | 'S' | 'E' | 'W';

interface Grid {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface RobotPos {
  x: number;
  y: number;
  dir: Dir;
}

const turnLeft = (dir: Dir): Dir => {
  const map: Record<Dir, Dir> = { N: 'W', W: 'S', S: 'E', E: 'N' };
  return map[dir];
};

const turnRight = (dir: Dir): Dir => {
  const map: Record<Dir, Dir> = { N: 'E', E: 'S', S: 'W', W: 'N' };
  return map[dir];
};

const moveRobot = (pos: RobotPos): RobotPos => {
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

const isOffGrid = (pos: RobotPos, g: Grid) => pos.x < g.minX || pos.x > g.maxX || pos.y < g.minY || pos.y > g.maxY;

const processInstructions = (grid: Grid, start: RobotPos, instructions: string[]) => {
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

const run = (baseInput: string) => {
  const [gridCoords, ...input] = baseInput.split('\n').filter(String);
  const [maxX, maxY] = gridCoords.split(' ');
  const grid = {
    minX: 0,
    minY: 0,
    maxX: +maxX,
    maxY: +maxY,
  };
  const results = [];
  const scents = [];

  for (let i = 0, j = input.length; i < j; i += 2) {
    const [startX, startY, dir] = input[i].split(' ');
    const start = {
      x: +startX,
      y: +startY,
      dir,
    };
    const intructions = input[i + 1].split('');
    // console.log('🚀 ~ run ~ intructions:', intructions);
    // console.log('🚀 ~ run ~ [startX, startY, dir] :', [startX, startY, dir]);
    results.push(processInstructions(grid, start, intructions));
  }

  console.log('🚀 ~ run ~ results:', results);
};

console.log(run(baseInput));

function App() {
  return null;
}

export default App;
