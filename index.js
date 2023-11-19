const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const { Server } = require('socket.io')

const app = express();
const server = createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('text', (msg) => {
        // console.log("text: " + txt)
        socket.broadcast.emit('text', msg);
        // io.emit('text', txt)
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});