'use strict'

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

const express = require("express");
const router = express.Router();

router.get("/", (_, response) => {
    return response.json({
        code: 200,
        msg: 'You connected successfully with microservices'
    });
});

router.get("/status", (_, response) => {
    return response.json(require("../git-status.json"));
});

router.post("/update-status", require("../scripts/updateGitStatus"));

// router.get('/emit', (request, response) => {
//     request.app.get("io").emitInNameSpace('/', 'chat_message', 'Hola a todos!');

//     return response.json({
//         code: 200,
//         msg: 'Message emmited to every socket'
//     });
// });

// router.post('/signin', (request, response) => {
//     request.app.get("io").emitInNameSpace('/', 'chat_message', 'Alguien se registró!');

//     return response.json({
//         code: 200,
//         msg: 'Successfully registered'
//     });
// });

// router.post('/login', (request, response) => {
//     //request.app.get("io").emitInNameSpace('/', 'chat_message', 'Alguien inició sesión!');
//     request.app.get("io").emitInNameSpaceToUser('/', request.body.userId, 'chat_message', 'Hola Miguel!');

//     return response.json({
//         code: 200,
//         msg: 'Successfully logged in'
//     });
// });

module.exports = router;