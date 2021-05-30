import { figures } from '../../constants/figurines/figurines';

export function rotateFigure(name, index) {
  const curFigure = figures.find(fig => fig.name === name);
  if (curFigure.length === index) return curFigure[0];
  return curFigure[index + 1];
}

