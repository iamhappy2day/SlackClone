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
    socket.emit('messageFromServer', {data:"Welcome to the server"})
    socket.on('messageFromClient',(msg) => {
        console.log(msg)
    })
      let nsData = namespaces.map((ns) =>{
      return {
          img: ns.img,
          endpoint: ns.endpoint
      }
  })
    console.log(nsData)
});

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(socket.id);
    });
});
