import React, { useState } from 'react';
import { Col, Row, Container, Button, ButtonGroup } from 'react-bootstrap';
import { figures } from '../constants/figurines/figurines';
import { getFiguresPull } from '../utils/game/createPull';
import { rotateFigure } from '../utils/game/rotateFigure';
import { generateEmptyField, generateRandomField } from '../utils/game/generateField';
import { figuresWithPosition, pushFigureOnFieldMap, renderField, renderFigure } from '../utils/game/fieldAndFigures';

export function PlayField() {
  const playFieldSize = {
    height: 20,
    width: 10,
  };

  const defaultBg = '#90e890';
  const figuresPullCount = 20;
  const emptyField = () => generateEmptyField(playFieldSize);
  const randomField = () => generateRandomField(playFieldSize);

  const [playFieldMap, setFieldMap] = useState(generateEmptyField(playFieldSize));
  const [fieldRendered, setFieldRendered] = useState(renderField(playFieldMap, defaultBg));
  const [figureTypes, setFigureTypes] = useState(figuresWithPosition);

  const pushFigureOnFieldMapHandler = (figure) => {
    const newFieldMap = pushFigureOnFieldMap(figure, playFieldSize);
    setFieldMap([...newFieldMap]);
    setFieldRendered(renderField(newFieldMap, figure.color));
  };
  const figureTypesRendered = figureTypes.map(figure => renderFigure(figure, pushFigureOnFieldMapHandler));

  console.log(playFieldMap);


  const getEmptyFieldHandler = () => setFieldRendered(renderField(emptyField(), defaultBg));
  const getRandomFieldHandler = () => setFieldRendered(renderField(randomField(), defaultBg));

  const rotateAllFigureTypesHandler = () => {
    const newFig = figureTypes.map(item => rotateFigure(item));
    setFigureTypes(newFig);
  }

  const figuresPull = getFiguresPull(figuresPullCount);
  const figuresPullField = figuresPull.map(figureName => {
    const figure = figures.find(f => f.name === figureName);
    return renderFigure(figure);
  });
  const figuresPullRendered = useState(figuresPullField);

  return (
    <Container
      className={'d-flex align-items-center'}
      fluid style={{ minHeight: '100vh', display: 'grid' }}
    >
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        <ButtonGroup className={'my-3'}>
          <Button onClick={getRandomFieldHandler} variant={'outline-success'}>
            Random Fill
          </Button>
          <Button onClick={getEmptyFieldHandler} variant={'outline-danger'}>
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
        <ButtonGroup>
          <Button>
            Left
          </Button>
          <Button>
            Right
          </Button>
          <Button>
            Down
          </Button>
        </ButtonGroup>
        {figureTypesRendered}
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
