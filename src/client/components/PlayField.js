import React, { useEffect, useState } from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { figures } from '../constants/figurines/figurines';
import {getFiguresPull, getRandomInt} from '../utils/game/createPull';
import { rotateFigure } from '../utils/game/rotateFigure';
import { generateEmptyField, generateRandomField } from '../utils/game/generateField';
import { figuresWithPosition, pushFigureOnFieldMap, renderField, renderFigure } from '../utils/game/fieldAndFigures';
import {figureStacked, moveDown} from '../utils/game/moveFigure';

export function PlayField() {
  const playFieldSize = {
    height: 20,
    width: 10,
  };

  const defaultBg = '#90e890';
  const figuresPullCount = 20;
  const figureMoveDownInterval = 1000;
  const emptyField = () => generateEmptyField(playFieldSize);
  const randomField = () => generateRandomField(playFieldSize);

  const [playFieldMap, setFieldMap] = useState(emptyField);
  const [fieldRendered, setFieldRendered] = useState(renderField(playFieldMap, defaultBg));
  const [figureTypes, setFigureTypes] = useState(figuresWithPosition);
  const [currentFigure, setCurrentFigure] = useState(
    figuresWithPosition[getRandomInt(0, figuresWithPosition.length - 1)]
  );

  const pushFigureOnFieldMapHandler = (figure) => {
    setCurrentFigure(figure);
    setFieldMap([...pushFigureOnFieldMap(figure, playFieldMap)]);
  };
  const figureTypesRendered = figureTypes.map(figure => renderFigure(figure, pushFigureOnFieldMapHandler));

  const getEmptyFieldHandler = () => setFieldMap(emptyField());
  const getRandomFieldHandler = () => setFieldMap(randomField());

  const rotateAllFigureTypesHandler = () => {
    const newFig = figureTypes.map(item => rotateFigure(item));
    setFigureTypes(newFig);
  };
  const figuresPull = getFiguresPull(figuresPullCount); // рандомный пул

  const figuresPullField = figuresPull.map(figureName => { // отрендеренный пул
    const figure = figures.find(f => f.name === figureName);
    return renderFigure(figure);
  });

  const moveDownHandler = () => {
    setFieldMap([...moveDown(playFieldMap, currentFigure.name)]);
  }

  const figuresPullRendered = useState(figuresPullField);

  const moveLeftHandler = () => {
  }

  const moveRightHandler = () => {
  }

  useEffect(() => {
    setFieldRendered(renderField(playFieldMap, currentFigure.color))
  }, [playFieldMap]);

  const callbackKeys = (e) => {
    switch (e.code) {
    case 'ArrowDown':
      return moveDownHandler();
    case 'ArrowLeft':
      console.log('left');
      return;
    case 'ArrowRight':
      console.log('right');
      return;
    case 'Space':
      console.log('Space');
      return;
    default:
      return;
    }
  };

  return (
    <Container
      className={'d-flex align-items-center'}
      fluid
      onKeyDown={callbackKeys}
      style={{ minHeight: '100vh', display: 'grid' }}
      tabIndex='0'
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
          <Button onClick={moveLeftHandler}>
            Left
          </Button>
          <Button onClick={moveRightHandler}>
            Right
          </Button>
          <Button onClick={moveDownHandler}>
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
