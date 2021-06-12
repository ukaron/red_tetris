import React, { useState } from 'react';
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

    const [response, setResponse] = useState("");
    const [socket, setSocket] = useState(null);

    const logIn = () => {
        if (name) {
            history.push('/lobby');
            dispatch(userLogIn(name));
        }
    }
    useEffect(() => {
        setSocket(io(ENDPOINT));
    }, []);

    useEffect(() => {
        socket?.on("FromAPI", data => {
            setResponse(data);
        });
    }, [socket]);

	return (
        <Card style={{ width: '35rem' }} className='conteiner'>
            <Card.Body>
                <Card.Title as="h2" className='mt-3'>WELCOME HERE!</Card.Title>
                <FormControl
                    placeholder="Username"
                    className='mt-4'
                    size="lg"
                    onChange={(e) => setName(e.target.value)}
                />
                <Button className='mt-4 mb-4 main-btn' size="lg" onClick={logIn}>PLAY</Button>
            </Card.Body>
        </Card>
	);
}

const mapStateToProps = (state) => ({
	common: CommonSelector(state),
});

export default connect(mapStateToProps)(Welcome);
