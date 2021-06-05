import { Col, Container, Row } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import React from 'react';
import { generateEmptyField } from './generateField';
import { figures } from '../../constants/figurines/figurines';

const defaultFigureStartPosition = 4;
const defaultBgColor = '90e890';

export const renderField = (fieldMap, color = defaultBgColor) => fieldMap.map((v, i) => {
  const cellSize = '30px';
  return (
    <Row className={'shadow shadow-sm'} key={`row-${i}${nanoid()}`}>
      {v.map((h, i) => (
        <Col
          className={`text-center d-flex justify-content-center
      align-items-center border border-light`}
          key={`col-${i}-${color}${nanoid()}`}
          style={{
            height: cellSize,
            width: cellSize,
            padding: '10px',
            color: `${h ? color : 'white'}`,
            backgroundColor: `${h ? color : 'white'}`,
          }}
        />
      ))}
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

export const pushFigureOnFieldMap = (figure, playFieldSize, figureStartPosition = defaultFigureStartPosition) => {
  const newPlayFieldMap = generateEmptyField(playFieldSize);

  const coords = figure.coords[figure.position];
  newPlayFieldMap.map((row, rI) => {
    row.map((col, cI) => {
      const colIndex = cI + 1;
      if (colIndex >= figureStartPosition && coords.length > rI) {
        if (coords[rI][cI - figureStartPosition])
          newPlayFieldMap[rI][cI] = coords[rI][cI - figureStartPosition];
      }
    })
  })
  return newPlayFieldMap;
};

export const figuresWithPosition = figures.map(figure => {
  figure.position = 0;
  return figure;
});
