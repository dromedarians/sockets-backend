const express = require('express');

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

//let coordinates = { x: 10, y: 10, h: 50, w: 50 };

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log(socket.server.clients)
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message submitted', (msg) => {
    console.log('new message', msg)
    io.emit('new message', msg)
  })


  let x = 10;
  let y = 10;
  let h = 50;
  let w = 50;

  socket.on('right arrow', (d) => {
    console.log('right arrow', d);
    io.emit('right arrow', {x, y, w, h}, {x: x+10, y, w, h});
    x+=10
  })
  socket.on('left arrow', (d) => {
    console.log('left arrow')
    io.emit('left arrow', {x, y, w, h}, {x: x-10, y, w, h});
    x-=10
  })
  socket.on('up arrow', (d) => {
    console.log('up arrow');
    io.emit('up arrow', {x, y, w, h}, {x, y: y-10, w, h});
    y-=10
  })
  socket.on('down arrow', (d) => {
    console.log('down arrow');
    io.emit('down arrow', {x, y, w, h}, {x, y: y+10, w, h});
    y+=10;
  })

});


http.listen(process.env.PORT || 8080, () => {
  console.log('Server connected on port 8080')
})