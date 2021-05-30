import React, {useState} from 'react';
import { Col, Row, Container, Button, ButtonGroup } from 'react-bootstrap';
import { figures } from '../constants/figurines/figurines';
import {getRandomInt, getTetrPull} from '../utils/game/createPull';
import Game from "../pages/Game";

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

  const [playFieldMap, setPlayFieldMap] = useState(generateEmptyField());
  const [allFigures, setAllFigures] = useState(figures.map(figure => {
    figure.position = 0;
    return figure;
  }));

  console.log(allFigures);

  const bgFiled = '#90e890';
  const cellSize = 'auto';

  const renderField = (fieldMap, color) => fieldMap.map((v, i) =>
    <Row className={'shadow shadow-sm'} key={`row-${i}`}>
      {v.map((h, i) => (
        <Col
          className={`text-center d-flex justify-content-center p-3
        align-items-center border border-light`}
          key={`col-${i}-${color}`}
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
      key={`figure-${figure.name}`}
      onClick={ () => onClick(figure.name) }
      style={{ display: 'grid', cursor: onClick ? 'pointer' : 'initial' }}
    >
      {renderField(figure.coords[0], figure.color)}
    </Container>
  )

  const fieldRendered = renderField(playFieldMap, bgFiled);
  const figureStartPosition = 5;
  const figuresOnClickHandler = (figureName) => {
    console.log(figureName);
    setPlayFieldMap(generateEmptyField);
  };
  const rotateAllFiguresHandler = () => {
    allFigures.map(figure => {
      figure.position = figure.position + 1;
      return figure;
    });
    setAllFigures([...allFigures]);
    console.log(allFigures);
  }
  const figuresRendered = allFigures.map(figure => renderFigure(figure, figuresOnClickHandler));

  const figuresPullCount = 20;
  const figuresPull = getTetrPull(figuresPullCount);
  const figuresPullRendered = figuresPull.map(figureName => {
    const figure = allFigures.find((f) => f.name === figureName);
    return renderFigure(figure);
  })

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
