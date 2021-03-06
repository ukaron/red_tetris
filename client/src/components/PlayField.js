import React, { useEffect, useState } from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { figures } from '../constants/figurines/figurines';
import { getFiguresPull, getRandomInt } from '../utils/game/createPull';
import { rotateFigure } from '../utils/game/rotateFigure';
import { generateEmptyField, generateRandomField } from '../utils/game/generateField';
import {
  defaultFigureStartPosition,
  figuresWithPosition,
  pushFigureOnFieldMap,
  renderField,
  renderFigure,
} from '../utils/game/fieldAndFigures';
import { figureStacked, moveDown, moveLeft, moveRight } from '../utils/game/moveFigure';
import '../styles/PlayField/main.css';

export function PlayField() {
  const playFieldSize = {
    height: 20,
    width: 10,
  };

  const [moveLocked, setMoveLocked] = useState(true);
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
    figure.location = defaultFigureStartPosition;
    setCurrentFigure(figure);
    setFieldMap([...pushFigureOnFieldMap(figure, playFieldMap, defaultFigureStartPosition)]);
  };
  const figureTypesRendered = figureTypes.map(figure => renderFigure(figure, pushFigureOnFieldMapHandler));

  const getEmptyFieldHandler = () => setFieldMap(emptyField());
  const getRandomFieldHandler = () => setFieldMap(randomField());

  const rotateAllFigureTypesHandler = () => {
    const newFig = figureTypes.map(item => rotateFigure(item));
    setFigureTypes(newFig);
  };
  const figuresPull = getFiguresPull(figuresPullCount); // ?????????????????? ??????

  const figuresPullField = figuresPull.map(figureName => { // ?????????????????????????? ??????
    const figure = figures.find(f => f.name === figureName);
    return renderFigure(figure);
  });

  const figuresPullRendered = useState(figuresPullField);

  const moveDownHandler = () => {
    if (!moveLocked) {
      setFieldMap([...moveDown(currentFigure, playFieldMap)]);
    }
  }

  const moveLeftHandler = () => {
    if (!moveLocked)
    console.log(currentFigure);
    setFieldMap([...moveLeft(currentFigure, playFieldMap)]);
  }

  const moveRightHandler = () => {
    if (!moveLocked)
      setFieldMap([...moveRight(currentFigure, playFieldMap)]);
  }

  const moveUpHandler = () => {

    setFieldMap([...rotateFigure(playFieldMap, currentFigure, setCurrentFigure)]);
  }

  useEffect(() => {
    setFieldMap([...pushFigureOnFieldMap(currentFigure, playFieldMap, currentFigure.location)]);
  }, [currentFigure]);

  useEffect(() => {
    setFieldRendered(renderField(playFieldMap, currentFigure.color))
  }, [playFieldMap, currentFigure.color]);

  useEffect(() => {
    window.addEventListener('figure-spawned', () => {
      setMoveLocked(false);
    });
    window.addEventListener('figure-stuck', () => {
      setMoveLocked(true);
    })
  }, [])

  const callbackKeys = (e) => {
    e.preventDefault();
    if (!moveLocked) {
      switch (e.code) {
        case 'ArrowDown':
          return moveDownHandler();
        case 'ArrowLeft':
          return moveLeftHandler();
        case 'ArrowRight':
          return moveRightHandler();
        case 'ArrowUp':
          return moveUpHandler();
        case 'Space':
          console.log('Space');
          return;
        default:
          return;
      }
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
        <ButtonGroup>
          <Button onClick={moveLeftHandler}>
            Left
          </Button>
          <Button onClick={moveDownHandler}>
            Down
          </Button>
          <Button onClick={moveRightHandler}>
            Right
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
