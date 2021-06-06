'use strict'

const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const gitStatusPath = path.resolve('./git-status.json'); 
// const {name, version, description} = require("../../../package.json");

module.exports = (request, response) => {
    let data = request.body;
    let commit = data.commits[0];

    if(fs.existsSync(gitStatusPath)){
        let gitStatus = JSON.parse(fs.readFileSync(gitStatusPath));

        gitStatus.branch = data.ref.split("/")[2];
        gitStatus.commit = {
            message: commit.message,
            url: commit.url,
            date: moment.unix(commit.timestamp).format("DD/MM/YYYY hh:mm:ss a")
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
                    date: commit.timestamp
                },
                user: {
                    name: data.user_name,
                    username: data.user_username
                }
            })
        );
    }

    return response.status(200).json({
        code: 200,
        msg: "Notify received successfully"
    });
}
