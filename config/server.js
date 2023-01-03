'use strict'

const express = require("express");
const http = require("http");
const db = require('./database');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cron = require("../app/cron/cron");
const socket = require("../app/socket/socket");
const path = require("path");
const cors = require("cors");

class Server{
    constructor(){
       this.app = express();
       this.server = http.createServer(this.app);
       this.port = process.env.PORT || 3900;
       this.db = new db();
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
        this.app.use(bodyParser.json({limit: '10mb', extended: true}));
        this.app.use(fileUpload());

        this.app.use((request, response, next) => {
            const allowedOrigins = ["https://aleymiguel.netlify.app/", "wedding-manager-api.onrender.com", "187.190.190.236"];
            const origin = request.headers.origin || request.headers.host
            console.log(request.headers);

            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            response.header('Access-Control-Allow-Headers', 'API_TOKEN, Authorization, X-API-KEY, Origin, X-Requested-With, User-Agent, Content-Type, Accept, Access-Control-Allow-Request-Method');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            response.header('Allow', 'GET, POST, PUT, DELETE');

            if((process.env.NODE_ENV === 'local') || (allowedOrigins.includes(origin) || (origin.search("distritopyme.netlify.app")))) {
                next();
            }
            else {
                return response.json({
                    status: 403,
                    msg: `You don´t have permissions. Only specific domains are allowed to access.`
                });
            }
        });
    }

    routing(){
        this.app.use('/', require('../routes/web'));
        this.app.use('/api', require("../app/http/middlewares/verifyToken"), require('../routes/api'));
    }

    socket(server){
        global.io = new socket(server);
    }

    cron(){
        global.cron = new cron();
    }

    async initialize(){
        try{
            this.middlewares();
            this.routing();

            /*Server express*/
            // await this.app.listen(this.port, () => {
            //     console.log(`Server running on port: ${this.port}`);
            // });

            /*Server http*/
            await this.server.listen(this.port, () => {
                console.log(`Server running on port: ${this.port}`);
                this.socket(this.server);
            });

            await this.db.connect();
            // this.cron();
        }
        catch(error){
            console.log("Something went wrong trying to initialize the server :(");
            console.log(error);
        }
    }
}

module.exports = Server;