
var express = require("express");
var app = express();
var server = require("http").Server(app);
var cantidad = 0;
var sw=true;

var io = require("socket.io")(server);

app.use(express.static("cliente"));

app.get('/hola',function(req , res){
  res.status(200).send('Hola mundo ruta');
})

var messages  = [{
  id: 1,
  text : '',
  nickname : ''
}]; 

io.on("connection",function(socket){
  console.log("Se conectaron a la pagina, Cuidaoo!!"+ socket.handshake.address+" dir");  
   console.log(" Cantidad antes:  "+cantidad);
   
   cantidad++;
   console.log("Despuee: " +cantidad);
     socket.emit("messages",messages);

      socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
      });
  
      socket.on('vaciar-chat',function(data){
        messages = [{
          id: 1,
          text : 'Bienvenidos',
          nickname : 'Usuario'
        }]
        io.sockets.emit('messages',messages);
      });
});

// socket.Handshake.address -> Obtener IP de un equipo que se conecte 
server.listen(6677,function(){
  console.log("Server activo");
});

