import React, { useState } from 'react';
import { Col, Row, Container, Button, ButtonGroup } from 'react-bootstrap';
import { figures } from '../constants/figurines/figurines';
import { getTetrPull } from '../utils/game/createPull';
import { nanoid } from 'nanoid';
import { rotateFigure } from '../utils/game/rotateFigure';
import { generateEmptyField, generateRandomField } from '../utils/game/generateField';

export function PlayField() {
  const playFieldSize = {
    height: 20,
    width: 10,
  };

  const defaultBg = '#90e890';
  const cellSize = '30px';
  const figuresWithPosition = figures.map(figure => {
    figure.position = 0;
    return figure;
  });

  const renderField = (fieldMap, color) => fieldMap.map((v, i) =>
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
  );

  const emptyField = () => generateEmptyField(playFieldSize);
  const randomField = () => generateRandomField(playFieldSize);
  const [playFieldMap, setPlayFieldMap] = useState(generateEmptyField(playFieldSize));
  const [figureTypes, setFigureTypes] = useState(figuresWithPosition);
  const [fieldRendered, setFieldRendered] = useState(renderField(playFieldMap, defaultBg));
  const getEmptyField = () => setFieldRendered(renderField(emptyField(), defaultBg));
  const getRandomField = () => setFieldRendered(renderField(randomField(), defaultBg));

  const figureStartPosition = 4;
  const pushFigureOnFieldMap = (figure) => {
    const newPlayFieldMap = emptyField();

    const coords = figure.coords[figure.position];
    newPlayFieldMap.map((row, rI) => {
      row.map((col, cI) => {
        const colIndex = cI + 1;
        if (colIndex >= figureStartPosition && coords.length > rI) {
          newPlayFieldMap[rI][cI] = coords[rI][cI - figureStartPosition];
        }
      })
    })
    setFieldRendered(renderField(newPlayFieldMap, figure.color));
  }

  const figuresOnClickHandler = (figure) => {
    pushFigureOnFieldMap(figure);
  };
  const rotateAllFigureTypesHandler = () => {
    const newFig = figureTypes.map(item => rotateFigure(item));
    setFigureTypes(newFig);
  }
  const figuresRendered = figureTypes.map(figure => renderFigure(figure, figuresOnClickHandler));

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
      fluid style={{ minHeight: '100vh', display: 'grid' }}
    >
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        <ButtonGroup className={'my-3'}>
          <Button onClick={getRandomField} variant={'outline-success'}>
            Random Fill
          </Button>
          <Button onClick={getEmptyField} variant={'outline-danger'}>
            Clear
          </Button>
        </ButtonGroup>
        <div className={'shadow shadow-md'}>
          {fieldRendered}
        </div>
      </Container>
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        <div className={'text-center my-3'}>
          <Button onClick={rotateAllFigureTypesHandler} variant={'outline-warning'}>
            Rotate All
          </Button>
        </div>
        {figuresRendered}
      </Container>
      <Container
        className={'align-items-center justify-content-center'}
        style={{ display: 'grid', height: '100vh', overflow: 'auto' }}
      >
        <div className={'text-center'}>
          Pull - {figuresPullCount}
        </div>
        {figuresPullRendered}
      </Container>
    </Container>
  )
}
