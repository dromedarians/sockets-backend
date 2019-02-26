const express = require('express');

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

//let coordinates = { x: 10, y: 10, h: 50, w: 50 };

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message submitted', (msg) => {
    console.log('new message', msg)
    io.emit('new message', msg)
  })

  socket.on('right arrow', (d) => {
    console.log('right arrow', d);
    io.emit('right arrow', d);
  })
  socket.on('left arrow', (d) => {
    console.log('left arrow')
    io.emit('left arrow', d);
  })
  socket.on('up arrow', (d) => {
    console.log('up arrow');
    io.emit('up arrow', d);
  })
  socket.on('down arrow', (d) => {
    console.log('down arrow');
    io.emit('down arrow', d);
  })

});


http.listen(process.env.PORT || 8080, () => {
  console.log('Server connected on port 8080')
})