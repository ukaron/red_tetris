const getCountMap = (fieldMap) => {
    return fieldMap.reduce((acc, item) => [...acc, ...item.filter(coord => coord && coord === 1)], []).length;
}
const getRotatedFigure = (figure) => {
    if (figure.position === figure.coords.length - 1) return ({...figure, position: 0});
    return ({...figure, position: figure.position + 1});
}

export function castRotate(fieldMap, figure) {
    let newPlayField = fieldMap;
    const countMapStart = getCountMap(fieldMap);
    const lenFigure = figure.coords.length;
    for (let i = figure.location.y, x = 0; x < lenFigure - 1; i++, x++) {
        for (let j = figure.location.x, y = 0; y < lenFigure - 1; j++, y++) {
            newPlayField[i][j] = -1;
            newPlayField[i][j] = figure.coords[figure.position][y][x];
        }
    }
    const countMapEnd = getCountMap(newPlayField);
    if (countMapStart !== countMapEnd) return false;
    return newPlayField;
}

export function rotateFigure(playFieldMap, figure, setCurrentFigure) {
    const newFigure = getRotatedFigure(figure);
    const newPlayFieldMap = castRotate(playFieldMap, newFigure);
    console.log('rot', newPlayFieldMap);
    if (newPlayFieldMap) {
        setCurrentFigure(newFigure)
        return newPlayFieldMap;
    }
    return playFieldMap;
}

