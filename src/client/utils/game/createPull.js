function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() { // тут — сами фигуры
  const tetrominoSequence = [];
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  while (sequence.length) { // случайным образом находим любую из них
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0]; // помещаем выбранную фигуру в игровой массив с последовательностями
    tetrominoSequence.push(name);
  }
  return tetrominoSequence;
};

export function getTetrPull(len) {
  let res = [];
  for (let i = len; res.length < len; i--) {
    res = [...res, ...generateSequence()]
  }
  return res.slice(0, len);
};

