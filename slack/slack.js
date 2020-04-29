const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000, () => {
  console.log('Server is running on port 9000');
});

const io = socketio(expressServer);

io.on('connection', (socket) => {

  // socket.emit('messageFromServer', { data: 'Welcome to the server' });
  // socket.on('messageFromClient', (msg) => {
  //   console.log(msg);
  // });
//todo We need to build an array to send back with the img and endpoint for each NS

  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
    //todo We need to send ns data back to the client. We need to use socket, not io, bacause we want it to
    //go to just this client
    socket.emit('nsList', nsData)
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (socket) => {
    console.log(socket.id);
  });
});
