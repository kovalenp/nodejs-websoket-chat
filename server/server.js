const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { name } = require('../package.json');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (location) => {
    io.emit('newLocationMessage', generateLocationMessage('User', location));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(express.static(PUBLIC_PATH));
server.listen(PORT, () => console.log(` ${name} app listening on port ${PORT}!`));
