const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const port = process.env.PORT || 3001;
const User = require('./models/User');
const Lobby = require('./models/Lobby');

const users = [];
const lobbies = [];

const app = express();
app.use(cors({credentials: true}));

const server = http.createServer(app);

const io = socketIo(server, {
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    socket.on('new user', (name) => {
        if (users.every(user => user.getName() !== name)) {
            users.push(new User(name));
        }
        console.log('users', users);
    });
    
    socket.on('new lobby', (lobbyName, firstUser) => {
        if (lobbies.every(lobby => lobby.getName() !== lobbyName)) {
            lobbies.push(new Lobby(lobbyName, firstUser));
        }
        socket.broadcast.emit('update lobby list', lobbies);
        socket.emit('update lobby list', lobbies);
        console.log('lobbies', lobbies);
    });

    socket.on('join', (lobbyName, userName) => {
        currentLobby = lobbies.find(lobby => lobby.getName() === lobbyName);
        currentLobby.addUser(userName);
        socket.broadcast.emit('update lobby list', lobbies);
        socket.emit('update lobby list', lobbies);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
