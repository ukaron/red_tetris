import { Col, Container, Row } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import React from 'react';
import { c, figures } from '../../constants/figurines/figurines';

export const figureSpawned = new CustomEvent('figure-spawned');
const defaultFigureStartPosition = {x: 4, y: 0};
const defaultBgColor = '90e890';

export const renderField = (fieldMap, color = defaultBgColor) => fieldMap?.map((v, i) => {
  const cellSize = '30px';
  return (
    <Row className={'shadow shadow-sm'} key={`row-${i}${nanoid()}`}>
      {v.map((h, i) => {
        const stashFigure = figures.find((el) => el.name === h);
        return (
          <Col
            className={`text-center d-flex justify-content-center
      align-items-center border border-light`}
            key={`col-${i}-${color}${nanoid()}`}
            style={{
              height: cellSize,
              width: cellSize,
              padding: '10px',
              color: `${stashFigure ? stashFigure.color : h === c ? color : 'white'}`,
              backgroundColor: `${stashFigure ? stashFigure.color :  h === c ? color : 'white'}`,
            }}
          />
        )
      })}
    </Row>
  )
}
);

export const renderFigure = (figure, onClick = null) => (
  <Container
    className={'align-items-center justify-content-center my-2'}
    key={`figure-${figure.name}-${nanoid()}`}
    onClick={() => (onClick ? onClick(figure) : '')}
    style={{ display: 'grid', cursor: onClick ? 'pointer' : 'initial' }}
  >
    {renderField(figure.coords[figure.position], figure.color)}
  </Container>
);

export const pushFigureOnFieldMap = (figure, playFieldMap, figureStartPosition = defaultFigureStartPosition) => {
  playFieldMap = cleanupFieldMap(playFieldMap);
  playFieldMap = pushFigure(figure, playFieldMap, figureStartPosition);
  window.dispatchEvent(figureSpawned);
  return playFieldMap;
};

function pushFigure(figure, playFieldMap, figureStartPosition = defaultFigureStartPosition) {
  const coords = figure.coords[figure.position];
  let figureUsefulRowCount = 0;
  figure.coords[figure.position].forEach((r) => {
    const res = r.find(f => f);
    if (res)
      figureUsefulRowCount = figureUsefulRowCount + 1;
  });
  playFieldMap?.forEach((row, rI) => {
    row.forEach((col, cI) => {
      const colIndex = cI + 1;
      if (colIndex >= figureStartPosition.x && coords.length > rI) {
        if (playFieldMap.length < figureStartPosition.y + figureUsefulRowCount)
          figureStartPosition.y = playFieldMap.length - figureUsefulRowCount;
        if (coords[rI][cI - figureStartPosition.x])
          playFieldMap[rI + figureStartPosition.y][cI] = coords[rI][cI - figureStartPosition.x];
      }
    })
  })
  return playFieldMap;
}

function cleanupFieldMap(playFieldMap) {
  playFieldMap.forEach((row, rI) => {
    row.forEach((col, cI) => {
      if (col === c)
        playFieldMap[rI][cI] = 0;
    })
  })
  return playFieldMap;
}

export const figuresWithPosition = figures.map(figure => {
  figure.position = 0;
  figure.location = defaultFigureStartPosition;
  return figure;
});
