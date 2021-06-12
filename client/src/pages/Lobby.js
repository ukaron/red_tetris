import React, { useState, useDispatch } from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';
import { Card, Button, FormControl, Row, Col } from 'react-bootstrap'

const lobbies = [{
        id: '1',
        lobbyName: 'hello_world',
        users: [],
        isActive: false,
    }, {
        id: '2',
        lobbyName: 'lobby_name',
        users: [],
        isActive: false,  
    }, {
        id: '3',
        lobbyName: 'the best lobby',
        users: [],
        isActive: false,
    },
];

const Lobby = () => {
    const [lobbyName, setLobbyName] = useState('');
    const createLobby = () => {
        console.log(lobbyName);
    }
	return (
        <div>
            <Card style={{ width: '35rem' }} className='conteiner first-card'>
                <Card.Body>
                    <Card.Title><h2 className='mb-4'>Create new room</h2></Card.Title>
                    <FormControl
                        onChange={(e) => setLobbyName(e.target.value)}
                        placeholder="Room name"
                        />
                    <Button className='mt-4 mb-4 main-btn' size="lg" onClick={createLobby}>CREATE</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '35rem' }} className='conteiner second-card'>
                <Card.Body>
                    <Card.Title><h2 className='mb-4'>List of rooms</h2></Card.Title>
                    { lobbies && lobbies.map((lobby) => (
                        <Row key={lobby.id}>
                            <hr/>
                            <Col className='mt-2'>
                                <Card.Subtitle className="mb-2">{lobby.lobbyName}</Card.Subtitle>
                                <Card.Subtitle className="mb-2">{lobby.users.length}/8 slots</Card.Subtitle>
                            </Col>
                            <Col>
                                <Button size="lg" variant="warning">JOIN</Button>
                            </Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>
        </div>
	);
}

const mapStateToProps = (state) => ({
	common: CommonSelector(state),
});

export default connect(mapStateToProps)(Lobby);