'use strict'

module.exports = io => {

    const web = io.of("/");//Root namespace 
    
    // let users = [];
    // let messages = [];

    web.on('connection', socket => {
        
    //   console.log(`New user connected!`);
      
    //   socket.username = socket.handshake.query.username;
    //   users[socket.id] = socket;
    //   socket.join(socket.handshake.query.roomid);

    //   socket.emit('chat_message', "Bienvenido al chat!");
    //   //socket.broadcast.emit('chat_message', `${socket.username} se ha unido al chat!`);
    //   socket.to(socket.handshake.query.roomid).broadcast.emit('chat_message', `${socket.username} se ha unido al chat!`);
      
    //   messages.forEach((message) => {
    //       socket.emit('chat_message', message);
    //   });

    //   socket.on('disconnect', () => {//console.log(socket);
    //       console.log(`User disconnected!`);

    //       //socket.broadcast.emit('chat_message', `${users[socket.id].username} ha abandonado el chat!`);
    //       socket.to(socket.handshake.query.roomid).emit('chat_message', `${users[socket.id].username} ha abandonado el chat!`);
    //       delete users[socket.id];
    //   });

    //   socket.on('chat_message', (data) => {
    //       //messages.push(msg);
    //       //socket.broadcast.emit('chat_message', msg);
    //       messages.push(data.message);
    //       socket.to(data.room).emit('chat_message', data.message);
    //   });
    
        socket.on('askAppData', () => {
            try{
                socket.emit('getAppData', require("../../../git-status.json"));
            }
            catch(error){
                console.log(error);
            }
        })
      
    });

}