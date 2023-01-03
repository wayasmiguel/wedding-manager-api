'use strict'

const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const gitStatusPath = path.resolve('./git-status.json'); 

const statusController = {
    getStatus: (_, response) => {
        try{
            if(fs.existsSync(gitStatusPath)) {
                return response.json(JSON.parse(fs.readFileSync(gitStatusPath)));
            }
            
            return response.json({
                code: 200,
                msg: "Git status file haven't been created yet"
            });
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
        const commit = data.commits[0];
    
        if(fs.existsSync(gitStatusPath)){
            let gitStatus = JSON.parse(fs.readFileSync(gitStatusPath));
    
            gitStatus.branch = data.base_ref.split("/")[2];
            gitStatus.commit = {
                message: commit.message,
                url: commit.url,
                date: moment(commit.timestamp).tz("America/Mexico_City").format("DD/MM/YYYY hh:mm:ss a")
            };
            gitStatus.user = {
                name: commit.author.name,
                username: commit.author.username
            };
            gitStatus.modified = commit.modified;
    
            fs.writeFileSync(gitStatusPath, 
                JSON.stringify(gitStatus)
            );
        }
        else{
            fs.appendFileSync(gitStatusPath, 
                JSON.stringify({
                    branch: data.base_ref.split("/")[2],
                    commit: {
                        message: commit.message,
                        url: commit.url,
                        date: moment(commit.timestamp).tz("America/Mexico_City").format("DD/MM/YYYY hh:mm:ss a")
                    },
                    user: {
                        name: commit.author.name,
                        username: commit.author.username
                    },
                    modified: commit.modified
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