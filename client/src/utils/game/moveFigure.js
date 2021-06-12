import { c, figures } from '../../constants/figurines/figurines';
import { rotateFigure } from './rotateFigure';

const figuresNames = figures.map(el => el.name);
export const figureStacked = new CustomEvent('figure-stuck');

export function castMoveLeft(fieldMap) {
  const canMove = true;
  for (let i = 0; i < fieldMap.length; i++) {
    const row = fieldMap[i];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === c) {
        if (!j) { // Overflow check
          console.log('overflow');
          return false;
        }
        const nextRowElement = fieldMap[i][j - 1];
        if (figuresNames.includes(nextRowElement)) { // Collision check
          console.log('collision');
          return false;
        }
      }
    }
  }
  return canMove;
}

export function castMoveRight(fieldMap) {
  const canMove = true;
  for (let i = 0; i < fieldMap.length; i++) {
    const row = fieldMap[i];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === c) {
        if (j === fieldMap[0].length - 1) { // Overflow check
          console.log('overflow');
          return false;
        }
        const nextRowElement = fieldMap[i][j + 1];
        if (figuresNames.includes(nextRowElement)) { // Collision check
          console.log('collision');
          return false;
        }
      }
    }
  }
  return canMove;
}

export function castMoveDown(fieldMap) {
  const canMove = true;
  for (let i = 0; i < fieldMap.length; i++) {
    const row = fieldMap[i];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === c) {
        if (i === fieldMap.length - 1) { // Overflow check
          console.log('overflow');
          return false;
        }
        const nextRowElement = fieldMap[i + 1][j];
        if (figuresNames.includes(nextRowElement)) { // Collision check
          console.log('collision');
          return false;
        }
      }
    }
  }
  return canMove;
}

export function castRotate(fieldMap) {
  const canMove = true;
  for (let i = 0; i < fieldMap.length; i++) {
    const row = fieldMap[i];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === c) {
        if (i === fieldMap.length - 1) { // Overflow check
          console.log('overflow');
          return false;
        }
        const nextRowElement = fieldMap[i + 1][j];
        if (figuresNames.includes(nextRowElement)) { // Collision check
          console.log('collision');
          return false;
        }
      }
    }
  }
  return canMove;
}

const placeFigureOnStash = (playFieldMap, figureName) => playFieldMap.map(row => row.map(col => {
  if (col === c)
    return figureName;
  return col;
}))

export const moveDown = (playFieldMap, figureName, setCurrentFigure) => {
  if (!castMoveDown(playFieldMap)) {
    window.dispatchEvent(figureStacked);
    return placeFigureOnStash(playFieldMap, figureName);
  }
  const newPlayField = playFieldMap;
  for (let i = playFieldMap.length - 1; i >= 0; i--) {
    for (let j = playFieldMap[0].length - 1; j >= 0; j--) {
      if (newPlayField[i][j] === c) {
        newPlayField[i + 1][j] = c;
        newPlayField[i][j] = 0;
      }
      if (!newPlayField[i][j])
        newPlayField[i][j] = 0;
    }
  }
  setCurrentFigure(figure => ({ ...figure, location: { ...figure.location, y: figure.location.y + 1}}))
  return newPlayField;
}

export const moveRight = (playFieldMap) => {
  if (!castMoveRight(playFieldMap)) {
    return playFieldMap;
  }
  const newPlayField = playFieldMap;
  for (let i = playFieldMap.length - 1; i >= 0; i--) {
    for (let j = playFieldMap[0].length - 1; j >= 0; j--) {
      if (newPlayField[i][j] === c){
        newPlayField[i][j+1] = c;
        newPlayField[i][j] = 0;
      }
      if (!newPlayField[i][j])
        newPlayField[i][j] = 0;
    }
  }
  return newPlayField;
}

export const moveLeft = (playFieldMap) => {
  if (!castMoveLeft(playFieldMap)) {
    return playFieldMap;
  }
  const newPlayField = playFieldMap;
  for (let i = 0; i < playFieldMap.length; i++) {
    for (let j = 0; j < playFieldMap[0].length; j++) {
      if (newPlayField[i][j] === c){
        newPlayField[i][j-1] = c;
        newPlayField[i][j] = 0;
      }
      if (!newPlayField[i][j])
        newPlayField[i][j] = 0;
    }
  }
  return newPlayField;
}

export const getRotateFigure = (playFieldMap) => {
  if (!castRotate(playFieldMap)) {
    rotateFigure()
    return playFieldMap;
  }
  const newPlayField = playFieldMap;
  for (let i = 0; i < playFieldMap.length; i++) {
    for (let j = 0; j < playFieldMap[0].length; j++) {
      if (newPlayField[i][j] === c){
        newPlayField[i][j-1] = c;
        newPlayField[i][j] = 0;
      }
      if (!newPlayField[i][j])
        newPlayField[i][j] = 0;
    }
  }
  return newPlayField;
}
