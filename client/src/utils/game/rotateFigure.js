export function rotateFigure(figure) {
  if (figure.position === figure.coords.length - 1) return ({ ...figure, position: 0 });
  return ({ ...figure, position: figure.position + 1 });
}

