export function rotateFigure(figure) {
  if (figure.position === figure.coords.length - 1) return ({ ...figure, position: 0 });
  return ({ ...figure, position: figure.position + 1 });
}

export const moveDown = (playFieldMap) => {
  const newPlayField = playFieldMap;
  for (let i = 19; i >= 0; i--) {
    for (let j = 9; j >= 0; j--) {
      if (newPlayField[i][j] === 2) newPlayField[i + 1][j] = 2;
      newPlayField[i][j] = 0;
    }
  }
  return newPlayField;
}

