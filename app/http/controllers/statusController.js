'use strict'

const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const gitStatusPath = path.resolve('../../git-status.json'); 

const statusController = {
    getStatus: (_, response) => {
        try{
            return response.json(fs.readFileSync(gitStatusPath));
        }
        catch(error){
            return response.json({
                code: 200,
                msg: "Git status file haven't been created yet"
            });
        }
    },
    updateStatus: (request, response) => {
        let data = request.body;
        let commit = data.commits[0];
    
        if(fs.existsSync(gitStatusPath)){
            let gitStatus = JSON.parse(fs.readFileSync(gitStatusPath));
    
            gitStatus.branch = data.ref.split("/")[2];
            gitStatus.commit = {
                message: commit.message,
                url: commit.url,
                date: moment(commit.timestamp).tz("America/Mexico_City").format("DD/MM/YYYY hh:mm:ss a")
            };
            gitStatus.user = {
                name: data.user_name,
                username: data.user_username
            };
    
            fs.writeFileSync(gitStatusPath, 
                JSON.stringify(gitStatus)
            );
        }
        else{
            fs.appendFileSync(gitStatusPath, 
                JSON.stringify({
                    branch: data.ref.split("/")[2],
                    commit: {
                        message: commit.message,
                        url: commit.url,
                        date: moment(commit.timestamp).tz("America/Mexico_City").format("DD/MM/YYYY hh:mm:ss a")
                    },
                    user: {
                        name: data.user_name,
                        username: data.user_username
                    }
                })
            );
        }
    
        global.io.emit('getAppData', JSON.parse(fs.readFileSync(gitStatusPath)));
    
        return response.status(200).json({
            code: 200,
            msg: "Notify received successfully"
        });
    }
}

module.exports = statusController;