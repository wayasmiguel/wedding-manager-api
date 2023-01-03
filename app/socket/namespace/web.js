'use strict'

const fs = require("fs");
const path = require("path");
const gitStatusPath = path.resolve('./git-status.json'); 

module.exports = io => {

    const web = io.of("/");//Root namespace 

    web.on('connection', socket => {
        
        // console.log(`New user connected!`);

        // socket.on('disconnect', () => {
        //     console.log(`User disconnected!`);
        // });
    
        socket.on('askAppData', () => {
            try{
                if(fs.existsSync(gitStatusPath)) {
                    socket.emit('getAppData', JSON.parse(fs.readFileSync(gitStatusPath)));   
                }
            }
            catch(error){
                console.log(error);
            }
        })
      
    });

}