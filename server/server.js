const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { name } = require('../package.json');


const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', 
  {
    from: 'Admin',
    text: 'Welcome to the chat app',
  });

  socket.broadcast.emit('newMessage', 
  {
    from: 'Admin',
    text: 'New user has joined',
    createdAt: Date.now(),
  });

  socket.on('createMessage', (message) => {
    console.log(JSON.stringify(message));
    io.emit('newMessage',
      { from: message.from,
        text: message.text,
        createdAt: Date.now(),
      })
  })

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  })
});

app.use(express.static(PUBLIC_PATH));
server.listen(PORT, () => console.log(` ${name} app listening on port ${PORT}!`));
