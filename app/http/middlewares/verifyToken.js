'use strict'

const express = require("express");
const route = express.Router(); 
const verifyToken = require("../helpers/jwt").verifyToken;

route.use((request, response, next) => {
    let { tokensecret, token } = request.headers;
    let tokenProvided = (token != null && token != 'null') ? token : tokensecret;

    if(tokenProvided){
        let verification = verifyToken(tokenProvided);

        if(verification.code == 200){
            if(verification.user != 'guest'){
                request.headers['tokenDecoded'] = verification.id;
            }
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
