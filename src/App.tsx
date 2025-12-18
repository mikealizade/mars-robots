import './App.css';
import { processInstructions, type RobotPos } from './robots.ts';

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
  // const scents = [];

  for (let i = 0, j = input.length; i < j; i += 2) {
    const [startX, startY, dir] = input[i].split(' ');
    const start = {
      x: +startX,
      y: +startY,
      dir,
    };
    const intructions = input[i + 1].split('');

    results.push(processInstructions(grid, start as RobotPos, intructions));
  }

  console.log('🚀 ~ run ~ results:', results);
};

console.log(run(baseInput));

function App() {
  return null;
}

export default App;
