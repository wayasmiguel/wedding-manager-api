'use strict'


const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");


const gitStatusPath = path.resolve('./gitStatus.json'); 
let commit = execSync("git log -1 --pretty=%B").toString().trim();

if(fs.existsSync(gitStatusPath)){
    let gitStatus = JSON.parse(fs.readFileSync(gitStatusPath));
    gitStatus.commit = commit;
    fs.writeFileSync(gitStatusPath, 
        JSON.stringify(gitStatus)
    );
}
else{
    fs.appendFileSync(gitStatusPath, 
        JSON.stringify({
            commit: commit
        })
    );
}

// exec("git log -1 --pretty=%B", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });