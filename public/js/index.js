const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li);
});

function sendNewMessage(from, text){
  socket.emit('createMessage',
    { from, text });
}

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  sendNewMessage('User', jQuery('[name=message]').val());
});
