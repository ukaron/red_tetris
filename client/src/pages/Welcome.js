import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CommonSelector } from '../selectors/common';
import { userLogIn } from "../actions/common";
import { Card, Button, FormControl } from 'react-bootstrap';
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

const Welcome = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [socket, setSocket] = useState(null);
    const [massage, setMassage] = useState('');
    
    useEffect(() => {
        setSocket(io(ENDPOINT));
    }, []);

    const logIn = () => {
        if (name.trim().length) {
            dispatch(userLogIn({ name, socket }));
            socket?.emit('new user', name);
        };
    }

    const onChangeUserName = (name) => {
        setName(name);
        setMassage('');
    };

    socket && socket?.on('push to the lobbies page', () => {
        history.push('/lobby')
    });

    socket && socket?.on('massage', massage => {
        setMassage(massage);
    });

	return (
        <Card style={{ width: '35rem' }} className='conteiner'>
            <Card.Body>
                <Card.Title as="h2" className='mt-3'>WELCOME HERE!</Card.Title>
                <FormControl
                    placeholder="Username"
                    className='mt-4'
                    size="lg"
                    onChange={(e) => onChangeUserName(e.target.value)}
                />
                <Button className='mt-4 mb-4 main-btn' size="lg" onClick={logIn}>PLAY</Button>
                { massage && <Card.Title as="h5">{massage}</Card.Title> }
            </Card.Body>
        </Card>
	);

}

const mapStateToProps = (state) => ({
	common: CommonSelector(state),
});

export default connect(mapStateToProps)(Welcome);
