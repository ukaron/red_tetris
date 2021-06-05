import { c } from '../../constants/figurines/figurines';

export function castLeftMove(fieldMap) {
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

export function castRightMove(fieldMap) {
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

export function castDownMove(fieldMap) {
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
  fieldMap?.map((row) => {
    console.log(row)
  })
}
