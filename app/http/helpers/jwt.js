'use strict'

const jwt = require("jsonwebtoken");
const { optionsJWT, secretPhrase } = require("../../../config/jwt");

const generateToken = (payload, options = {}) => {
    const token = jwt.sign(payload, secretPhrase, {
        ...optionsJWT,
        ...options,
    });

    return token;
}

const generateInfiniteToken = (payload) => {
    const token = jwt.sign(payload, secretPhrase, {});

    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, secretPhrase, (error, decoded) => {
        if(error) {
            return {
                code: 403,
                msg: 'Token inválido'
            }
        }
        else {
            return {
                code: 200,
                decoded
            }
        }
    });
}

module.exports = {
    generateToken,
    generateInfiniteToken,
    verifyToken
}
