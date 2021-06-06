'use strict'

module.exports = io => {

    const api = io.of("/api");

    api.on('connection', socket => {
        console.log(`New user connected to api!`);
    });

}