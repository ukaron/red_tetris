import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const Welcome = () => {
	return (
        <Card className='header'>
            <Card.Header>
                <Row>
                    <h4 className='mt-2 logo' variant="link">TETRIS</h4>
                    <Col md={{ offset: 8 }}>
                        <Button className={'btn'} variant="link" href={'/lobby'}>ROOM</Button>
                    </Col>
                    <Col>
                        <Button className={'btn'} variant="link" href={'/'}>EXIT</Button>
                    </Col>
                </Row>
            </Card.Header>
        </Card>
	);
}

export default Welcome;