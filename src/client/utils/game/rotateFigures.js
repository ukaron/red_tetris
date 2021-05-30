export function rotateFigure(figure) {
  if (figure.position === figure.coords.length) return ({ ...figure, position: 0 });
  return ({ ...figure, position: figure.position + 1 });
}
