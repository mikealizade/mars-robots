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

type Dir = 'N' | 'S' | 'E' | 'W';

interface Grid {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Start {
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

const processInstructions = (grid: Grid, start: Start, instructions: string[]) => {
  console.log('🚀 ~ processInstructions ~ start:', start);
  // console.log('🚀 ~ processInstructions ~ grid, start, instructions:', grid, start, instructions);
  const robot = { ...start };
  for (const move of instructions) {
    if (move === 'L') robot.dir = turnLeft(robot.dir);
    if (move === 'R') robot.dir = turnRight(robot.dir);
  }
  console.log('🚀 ~ processInstructions ~ robot:', robot);
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

  for (let i = 0, j = input.length; i < j; i += 2) {
    const [startX, startY, dir] = input[i].split(' ');
    const start = {
      x: startX,
      y: startY,
      dir,
    };
    const intructions = input[i + 1].split('');
    // console.log('🚀 ~ run ~ intructions:', intructions);
    // console.log('🚀 ~ run ~ [startX, startY, dir] :', [startX, startY, dir]);
    processInstructions(grid, start, intructions);
  }

  console.log('🚀 ~ run ~ inputArray:', grid);
};

console.log(run(baseInput));

function App() {
  return null;
}

export default App;
