'use strict'

const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const gitStatusPath = path.resolve('./git-status.json'); 

const statusController = {
    getStatus: (_, response) => {
        try{
            return response.json(JSON.parse(fs.readFileSync(gitStatusPath)));
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
    
        if(fs.existsSync(gitStatusPath)){
            let gitStatus = JSON.parse(fs.readFileSync(gitStatusPath));
    
            gitStatus.branch = data.repository.default_branch;
            gitStatus.commit = {
                message: data.repository.description,
                url: data.repository.commits_url,
                date: moment(data.created_at).tz("America/Mexico_City").format("DD/MM/YYYY hh:mm:ss a")
            };
            gitStatus.user = {
                name: data.sender.login,
                username: data.sender.login
            };
    
            fs.writeFileSync(gitStatusPath, 
                JSON.stringify(gitStatus)
            );
        }
        else{
            fs.appendFileSync(gitStatusPath, 
                JSON.stringify({
                    branch: data.repository.default_branch,
                    commit: {
                        message: data.repository.description,
                        url: data.repository.commits_url,
                        date: moment(data.created_at).tz("America/Mexico_City").format("DD/MM/YYYY hh:mm:ss a")
                    },
                    user: {
                        name: data.sender.login,
                        username: data.sender.login
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