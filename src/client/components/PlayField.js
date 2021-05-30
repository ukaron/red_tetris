import React, { useState } from 'react';
import { Col, Row, Container, Button, ButtonGroup } from 'react-bootstrap';
import { figures } from '../constants/figurines/figurines';
import { getRandomInt, getTetrPull } from '../utils/game/createPull';
import { nanoid } from 'nanoid';
import { rotateFigure } from '../utils/game/rotateFigures';

export function PlayField() {
  const playFieldSize = {
    height: 20,
    width: 10,
  };

  const getZeroOrOne = () => getRandomInt(0, 1);
  const getZero = () => 0;
  const generateField = (callBack) => Array.from({ length: playFieldSize.height }).map(() =>
    Array.from({ length: playFieldSize.width }).map(() => callBack()));
  const generateRandomField = () => generateField(getZeroOrOne);
  const generateEmptyField = () => generateField(getZero);
  const figuresWithPosition = figures.map(figure => {
    figure.position = 0;
    return figure;
  });

  const [playFieldMap, setPlayFieldMap] = useState(generateEmptyField());
  const [allFigures, setAllFigures] = useState(figuresWithPosition);

  const figureStartPosition = 4;
  const pushFigureOnFieldMap = (figure) => {
    const newPlayFieldMap = generateEmptyField();

    const coords = figure.coords[figure.position];
    newPlayFieldMap.map((row, rI) => {
      row.map((col, cI) => {
        const colIndex = cI + 1;
        if (colIndex >= figureStartPosition && coords.length > rI) {
          newPlayFieldMap[rI][cI] = coords[rI][cI - figureStartPosition];
        }
      })
    })
    setPlayFieldMap([...newPlayFieldMap]);
  }

  const bgFiled = '#90e890';
  const cellSize = 'auto';

  const renderField = (fieldMap, color) => fieldMap.map((v, i) =>
    <Row className={'shadow shadow-sm'} key={`row-${i}${nanoid()}`}>
      {v.map((h, i) => (
        <Col
          className={`text-center d-flex justify-content-center p-3
        align-items-center border border-light`}
          key={`col-${i}-${color}${nanoid()}`}
          style={{
            height: cellSize,
            width: cellSize,
            color: `${h ? color : 'white'}`,
            backgroundColor: `${h ? color : 'white'}`,
          }}
        />
      ))}
    </Row>
  );
  const renderFigure = (figure, onClick = null) => (
    <Container
      className={'align-items-center justify-content-center my-2'}
      key={`figure-${figure.name}-${nanoid()}`}
      onClick={ () => onClick(figure) }
      style={{ display: 'grid', cursor: onClick ? 'pointer' : 'initial' }}
    >
      {renderField(figure.coords[figure.position], figure.color)}
    </Container>
  )

  const fieldRendered = renderField(playFieldMap, bgFiled);
  const figuresOnClickHandler = (figure) => {
    pushFigureOnFieldMap(figure);
  };
  const rotateAllFiguresHandler = () => {
    const newFig = allFigures.map(item => rotateFigure(item));
    setAllFigures(newFig);
  }
  const figuresRendered = allFigures.map(figure => renderFigure(figure, figuresOnClickHandler));

  const figuresPullCount = 20;
  const figuresPull = getTetrPull(figuresPullCount);
  const figuresPullField = figuresPull.map(figureName => {
    const figure = figures.find((f) => f.name === figureName);
    return renderFigure(figure);
  })
  const figuresPullRendered = useState(figuresPullField);

  return (
    <Container
      className={'d-flex align-items-center'}
      fluid style={{ height: '100vh', display: 'grid' }}
    >
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        <ButtonGroup className={'my-3'}>
          <Button onClick={() => setPlayFieldMap(generateRandomField)} variant={'outline-success'}>
            Random Fill
          </Button>
          <Button onClick={() => setPlayFieldMap(generateEmptyField)} variant={'outline-danger'}>
            Clear
          </Button>
        </ButtonGroup>
        <div className={'shadow shadow-md'}>
          {fieldRendered}
        </div>
      </Container>
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        <div className={'text-center my-3'}>
          <Button onClick={rotateAllFiguresHandler} variant={'outline-warning'}>
            Rotate All
          </Button>
        </div>
        {figuresRendered}
      </Container>
      <Container
        className={'align-items-center justify-content-center'}
        style={{ display: 'grid', height: '100%', overflow: 'auto' }}
      >
        <div className={'text-center'}>
          Pull - {figuresPullCount}
        </div>
        {figuresPullRendered}
      </Container>
    </Container>
  )
}
