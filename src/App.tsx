import './App.css';

const input = `
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
`;

const run = (input: string) => {
  const inputArray = input.split('\n').filter(String);
  const [maxX, maxY] = inputArray[0].split(' ');
  const grid = {
    minX: 0,
    minY: 0,
    maxX: +maxX,
    maxY: +maxY,
  };
  console.log('🚀 ~ run ~ inputArray:', grid);
};

console.log(run(input));

function App() {
  return <></>;
}

export default App;
