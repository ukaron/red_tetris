import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';
import { Card, Button, FormControl, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Lobby = ({ common }) => {
    let history = useHistory();
    const socket = common.socket;
    const [lobbyName, setLobbyName] = useState('');
    const [lobbies, setLobbies] = useState([]);
    const [massage, setMassage] = useState('');

    useEffect(() => {
        if (! common.name)
            history.push('/');
    }, []);

    common.socket.id && socket?.on('update lobby list', lobbies => {
        setLobbies(lobbies);
        console.log('updated');
    });

    common.socket.id && socket?.on('push to the game', lobbyId => {
        console.log('push to ', lobbyId);
        history.push(`/game:${lobbyId}`);
    });

    common.socket.id && socket?.on('massage', massage => {
        setMassage(massage);
    });

    const createLobby = () => {
        socket?.emit('new lobby', lobbyName, common.name);
    }

    const joinLobby = (currentLobbyName) => {
        socket?.emit('join', currentLobbyName, common.name);
    }

    const leaveLobby = (currentLobbyName) => {
        socket?.emit('leave lobby', currentLobbyName, common.name);
    }

    const startLobby = (currentLobbyName) => {
        console.log('front');
        socket?.emit('start lobby', currentLobbyName);
    }

    const onChangeLobbyName = (name) => {
        setLobbyName(name);
        setMassage('');
    };

	return (
        <div>
            <Card style={{ width: '35rem' }} className='conteiner first-card'>
                <Card.Body>
                    <Card.Title><h2 className='mb-4'>Create new room</h2></Card.Title>
                    <FormControl
                        onChange={(e) => onChangeLobbyName(e.target.value)}
                        placeholder="Room name"
                        />
                    <Button className='mt-4 mb-4 main-btn' size="lg" onClick={createLobby}>CREATE</Button>
                    { massage && <Card.Title as="h5">{massage}</Card.Title> }
                </Card.Body>
            </Card>
            <Card style={{ width: '35rem' }} className='conteiner second-card'>
                <Card.Body>
                    <Card.Title><h2 className='mb-4'>List of rooms</h2></Card.Title>
                    { lobbies.length === 0 && <div>No lobbies yet :(</div> }
                    { lobbies && lobbies.map((lobby) => {
                        if (! lobby.isActive)
                            return (
                                <Row key={lobby.id}>
                                    <hr/>
                                    <Col className='mt-2'>
                                        <Card.Subtitle className="mb-2">{lobby.name}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2">{lobby.users.length}/8 slots</Card.Subtitle>
                                    </Col>
                                    <Col>
                                    {! lobby.users.includes(common.name) 
                                        ? <Button size="lg" variant="warning" onClick={() => joinLobby(lobby.name)}>JOIN</Button>
                                        : <Button size="lg" variant="danger" onClick={() => leaveLobby(lobby.name)}>LEAVE</Button>
                                    }
                                    { lobby.users[0] === common.name && 
                                        <Button className='start-button' size="lg" variant="warning" onClick={() => startLobby(lobby.name)}>START</Button>
                                    }
                                    </Col>
                                </Row>
                            );
                    })}
                </Card.Body>
            </Card>
        </div>
	);
}

const mapStateToProps = (state) => ({
	common: CommonSelector(state),
});

export default connect(mapStateToProps)(Lobby);
