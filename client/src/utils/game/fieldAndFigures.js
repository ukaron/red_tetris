import { Col, Container, Row } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import React from 'react';
import { c, figures } from '../../constants/figurines/figurines';
import {castMoveDown, figuresNames} from "./moveFigure";

export const figureSpawned = new CustomEvent('figure-spawned');
export const defaultFigureStartPosition = {x: 4, y: 0};
const defaultBgColor = '90e890';

export const renderField = (fieldMap, color = defaultBgColor) => fieldMap?.map((v, i) => {
  const cellSize = '30px';
  return (
    <Row className={'shadow shadow-sm'} key={`row-${i}${nanoid()}`}>
      {v.map((h, i) => {
        const stashFigure = figures.find((el) => el.name === h);
        return (
          <Col
            className={`figure_peace text-center d-flex justify-content-center
      align-items-center border border-light`}
            key={`col-${i}-${color}${nanoid()}`}
            style={{
              height: cellSize,
              width: cellSize,
              padding: '10px',
              color: `${stashFigure ? stashFigure.color : h === c ? color : h === -1 ? 'gray' : 'white'}`,
              backgroundColor: `${stashFigure ? stashFigure.color :  h === c ? color : h === -1 ? 'gray' : 'white'}`,
            }}
          >
            {h}
          </Col>
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

export function pushFigure(figure, playFieldMap, figureStartPosition = defaultFigureStartPosition) {
  playFieldMap = cleanupFieldMap(playFieldMap, true);
  playFieldMap = pushFigureProject(figure, playFieldMap);
  const coords = figure.coords[figure.position];
  let figureUsefulRowCount = 0;
  figure.coords[figure.position].forEach((r) => {
    const res = r.find(f => f === c);
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

export function pushFigureProject(figure, playFieldMap) {
  let figureUsefulRowCount = 0;
  let figuresUsefulColCount = [];
  figure.coords[figure.position].forEach((row, i) => {
    // let r = row.filter(f => f).length;
    // figuresUsefulColCount = r >= figuresUsefulColCount ? r : figuresUsefulColCount;
    row.forEach((col, j) => {
      if (col === c){
        figuresUsefulColCount = new Set([...figuresUsefulColCount, j])
      }
    })
    const res = row.find(f => f === c);
    if (res)
      figureUsefulRowCount = figureUsefulRowCount + 1;
  });
  figuresUsefulColCount = figuresUsefulColCount.size;

  playFieldMap?.forEach((row, rI) => {
    if (rI >= figure.location.y) {
      row.forEach((col, cI) => {
        if (cI >= figure.location.x && cI < figuresUsefulColCount + figure.location.x){
          if (!col){
            playFieldMap[rI][cI] = -1;
          }
        }
      })
    }
  })

  return playFieldMap;
}

export function cleanupFieldMap(playFieldMap, onlyProject=false) {
  playFieldMap.forEach((row, rI) => {
    row.forEach((col, cI) => {
      if (col === c && !onlyProject)
        playFieldMap[rI][cI] = 0;
      if (col === -1 && onlyProject)
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
