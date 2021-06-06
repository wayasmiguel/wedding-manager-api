'use strict'

const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const socket = require("../app/socket/socket");
const cron = require("../app/cron/cron");

class Server{
    constructor(){
       this.app = express();
       this.server = http.createServer(this.app);
       this.port = process.env.PORT || 3900;
       this.cron = new cron();
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(bodyParser.urlencoded( {extended:false} ));
        this.app.use(bodyParser.json());

        this.app.use((_, response, next) => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            response.header('Access-Control-Allow-Headers', 'API_TOKEN, Authorization, X-API-KEY, Origin, X-Requested-With, User-Agent, Content-Type, Accept, Access-Control-Allow-Request-Method');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            response.header('Allow', 'GET, POST, PUT, DELETE');
        
            next();
            // return response.json({
            //     status: 403,
            //     msg: `You don´t have permissions. Only specific domains are allowed to access it.`
            // });
        });
    }

    routing(){
        this.app.use('/', require('../routes/web'));
    }

    // socket(server){
    //     global.io = new socket(server);
    //     console.log(`Socket service initialized successfully`);
    // }

    async initialize(){
        try{
            this.middlewares();
            this.routing();

            /*Server express*/
            // this.app.listen(this.port, () => {
            //     console.log(`Server running on port ${this.port}`);
            // });

            /*Server http*/
            await this.server.listen(this.port, () => {
                console.log(`Server running on port: ${this.port}`);

                global.io = new socket(this.server);

                this.cron.initialize();
            });
        }
        catch(error){
            console.log("Something went wrong trying to initialize the server");
            console.log(error);
        }
    }
}

module.exports = Server;