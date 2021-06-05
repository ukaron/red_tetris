export function rotateFigure(figure) {
  if (figure.position === figure.coords.length - 1) return ({ ...figure, position: 0 });
  return ({ ...figure, position: figure.position + 1 });
}

export const moveDown = (playFieldMap, setPlayFieldMap) => {
  const newPlayField = playFieldMap;
  for (let i = 19; i >= 0; i--) {
    for (let j = 9; j >= 0; j--) {
      if (newPlayField[i][j] === 2) newPlayField[i + 1][j] = 3;
      newPlayField[i][j] = 0;
    }
  }
  setPlayFieldMap(newPlayField);
  return newPlayField;
}

export const figureMove = (code, playFieldMap, setPlayFieldMap) => {
  switch (code) {
  case 'ArrowDown':
    return moveDown(playFieldMap, setPlayFieldMap);
  case 'ArrowUp':
    console.log('up');
    return;
  case 'ArrowLeft':
    console.log('left');
    return;
  case 'ArrowRight':
    console.log('right');
    return;
  case 'Space':
    console.log('Space');
    return;
  default:
    return;
  }
}
