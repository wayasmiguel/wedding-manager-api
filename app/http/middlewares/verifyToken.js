'use strict'

const express = require("express");
const route = express.Router(); 
const verifyToken = require("../helpers/jwt").verifyToken;

route.use((request, response, next) => {
    const { wm_token, wm_infinitytoken } = request.headers;

    if(wm_token) {
        const verification = verifyToken(wm_token);

        if(verification.code === 200){
            request.headers['token'] = verification.decoded.uid;

            next();
        }
        else{
            return response.json(verification);
        }
    }
    else if(wm_infinitytoken) {
        const verification = verifyToken(wm_infinitytoken);

        if(verification.code === 200){
            request.headers['token'] = verification.decoded.uid;

            next();
        }
        else{
            return response.json(verification);
        }
    }
    else{
        response.json({
            code: 403,
            msg: "Token no proveído."
        });
    }
});

module.exports = route;
