'use strict'

module.exports = io => {

    const web = io.of("/");//Root namespace 

    web.on('connection', socket => {
        
        console.log(`New user connected!`);

        socket.on('disconnect', () => {
            console.log(`User disconnected!`);
        });
    
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