import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { CommonSelector } from '../selectors/common';
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

const Welcome = ({ common }) => {
    const [response, setResponse] = useState("");
    const [socket, setSocket] = useState(null);

    const sayAaaa = () => {
        socket && socket.on("From", data => {
            console.log(data);
        });
    }
    useEffect(() => {
        setSocket(io(ENDPOINT));
    }, []);
    useEffect(() => {
        socket && socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, [socket]);

    return (
        <p>
            It's <time dateTime={response}>{response}</time>
            <button onClick={sayAaaa}>click</button>
        </p>
    );
}

const mapStateToProps = (state) => ({
  common: CommonSelector(state),
});

export default connect(mapStateToProps)(Welcome);
