'use strict'

/*
|  emit: send an event to every single socket 
|  broadcast: send an event to every single socket except the origin
|  to/in: send an event to specific room socket joined
*/

const socketIo = require('socket.io');

class SocketService {

  constructor(server){
    this.io = socketIo(server);

    require('./namespace/web')(this.io);
    //require('./namespace/api')(this.io);

    console.log(`Socket service initialized successfully`);
  } 

  emit(event, data) {
    if(event && data)
      this.io.emit(event, data);
  }

  emitBroadcast(event, data) {
    if(event && data)
      this.io.broadcast.emit(event, data);
  }

  emitInNameSpace(namespace, event, data) {
    if(namespace && event && data)
      this.io.of(namespace).emit(event, data);
  }

  emitInNameSpaceBroadcast(namespace, event, data) {
    if(namespace && event && data)
      this.io.of(namespace).broadcast.emit(event, data);
  }

  //emitToRoom
  //emitToRoomBroadcast

  emitToUser(userId, event, data) {//userId = socketId
    if(userId && event && data)
      this.io.to(userId).emit(event, data);
  }

  emitInNameSpaceToUser(namespace, userId, event, data) {//userId = socketId
    if(namespace && userId && event && data)
      this.io.of(namespace).to(userId).emit(event, data);
  }

  //emitToRoomToUser
  //emitInNameSpaceToRoomToUser
  
}

module.exports = SocketService;