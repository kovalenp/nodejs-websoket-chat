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

socket.on('newLocationMessage', function(message) {
  const li = jQuery('<li></li>');
  const a = jQuery(`<a target="_blank">My current location</a>`)
  a.attr('href', message.url);
  li.text(`${message.from}: `);
  li.append(a);
  jQuery('#messages').append(li);
});


function sendNewMessage(from, text){
  socket.emit('createMessage',
    { from, text });
};

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  sendNewMessage('User', jQuery('[name=message]').val());
});

const locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, function () {
    alert('Unable to fetch location.')
  });

})