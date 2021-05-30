import React, {useState} from 'react';
import { Col, Row, Container, Button, ButtonGroup } from 'react-bootstrap';
import { O, I, J, L, S, T, Z, colors } from '../constants/figurines/figurines';

export function PlayField() {
  const playFieldSize = {
    height: 20,
    width: 10,
  };
  const figures = [
    O, I, J, L, S, T, Z,
  ]

  const getZeroOrOne = () => Math.floor(Math.random() * (1 + 1));
  const getZero = () => 0;
  const generateField = (callBack) => Array.from({ length: playFieldSize.height }).map(() =>
    Array.from({ length: playFieldSize.width }).map(() => callBack()));
  const generateRandomField = () => generateField(getZeroOrOne);
  const generateEmptyField = () => generateField(getZero);

  const [playFieldMap, setPlayFieldMap] = useState(generateRandomField())

  const bgFiled = 'danger';
  const cellSize = 'auto';

  const renderField = (fieldMap, color) => fieldMap.map(v =>
    <Row>
      {v.map((h, i) => {
        return (
          <Col
            className={`text-center d-flex justify-content-center
          align-items-center border border-light bg-${h ? color : ''} text-${h ? color : ''}`}
            key={`col-${i}`}
            style={{ height: cellSize, width: cellSize }}
          >
            {h}
          </Col>
        )
      })}
    </Row>
  )

  const fieldRendered = renderField(playFieldMap, bgFiled);
  const figuresRendered = figures.map((figure) => {
    console.log(figure)
    return (
      <Container className={'align-items-center justify-content-center my-2'} style={{ display: 'grid' }}>
        {renderField(figure, 'success')}
      </Container>
    )
  }
  )

  return (
    <Container
      className={'d-flex align-items-center'}
      fluid style={{ height: '100vh', display: 'grid' }}
    >
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        <ButtonGroup className={'my-3'}>
          <Button onClick={() => setPlayFieldMap(generateRandomField)} variant={'outline-success'}>
            Refresh
          </Button>
          <Button onClick={() => setPlayFieldMap(generateEmptyField)} variant={'outline-danger'}>
            Clear
          </Button>
        </ButtonGroup>
        {fieldRendered}
      </Container>
      <Container className={'align-items-center justify-content-center'} style={{ display: 'grid' }}>
        {figuresRendered}
      </Container>
    </Container>
  )
}
