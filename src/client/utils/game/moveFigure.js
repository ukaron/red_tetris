import { c } from '../../constants/figurines/figurines';

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
        if (fieldMap[i][j - 1] === 1) { // Collision check
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
        if (fieldMap[i][j + 1] === 1) { // Collision check
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
        if (fieldMap[i + 1][j] === 1) { // Collision check
          console.log('collision');
          return false;
        }
      }
    }
  }
  return canMove;
}

const placeFigureOnStash = (playFieldMap) => {
  return playFieldMap.map(row => row.map(col => {
    if (col === c)
      return 1;
    return col;
  }))
}

export const moveDown = (playFieldMap) => {
  if (!castMoveDown(playFieldMap)) {
    return placeFigureOnStash(playFieldMap);
  }
  const newPlayField = playFieldMap;
  for (let i = playFieldMap.length - 1; i >= 0; i--) {
    for (let j = playFieldMap[0].length - 1; j >= 0; j--) {
      if (newPlayField[i][j] === c){
        newPlayField[i + 1][j] = c;
        newPlayField[i][j] = 0;
      }
      if (!newPlayField[i][j])
        newPlayField[i][j] = 0;
    }
  }
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
