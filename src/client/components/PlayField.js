import React from 'react';
import { Col, Row } from 'react-bootstrap';

export function PlayField() {
  const fieldSize = { height: 20, width: 10 };

  const fieldMap = Array.from({ length: fieldSize.height }).map(() =>
    Array.from({ length: fieldSize.width }).map(() => 0)
  );

  const field = fieldMap.map(v =>
    <Row>
      {v.map((h, i) =>
        <Col key={`col-${i}`}>{h}</Col>
      )}
    </Row>
  )

  return (
    field
  )
}
