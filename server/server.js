const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { name } = require('../package.json');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) ||
        !isRealString(params.room)) {
      return callback('Name and room name are mandatory.');
    }

    socket.join(params.room);
    users.removeUser(socket.id); // remove user from previous chats
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast
      .to(params.room)
      .emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();

  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(message.from);
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    callback();
  });

  socket.on('createLocationMessage', (location) => {
    const user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, location));
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));      
    }
  });
});

app.use(express.static(PUBLIC_PATH));
server.listen(PORT, () => console.log(` ${name} app listening on port ${PORT}!`));
