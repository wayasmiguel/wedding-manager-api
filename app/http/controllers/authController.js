'use strict'

const User = require("../models/User");
const jwt = require("../helpers/jwt");

const authController = {
    sigin: async(request, response) => {
        try {
            const { username, email, password } = request.body;

            await User.create({ username, email, password });
    
            return response.json({
                code: 200,
                msg: "Usuario registrado exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de crear un nuevo usuario.",
                error: error.keyPattern
            });
        }
    },
    login: async(request, response) => {
        try {
            const { username, password } = request.body;

            const user = await User.findOne({username});
    
            if(!user) {
                return response.json({
                    code: 404,
                    msg: "El usuario no existe."
                });
            }

            const validPassword = await user.validatePassword(password);
    
            if(!validPassword) {
                return response.json({
                    code: 401,
                    msg: "Contraseña incorrecta."
                });
            }

            const token = jwt.generateToken({
                uid: user._id
            });
    
            return response.json({
                code: 200,
                token
            });
        }
        catch(error) {
            console.log(error);
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de iniciar sesión."
            });
        }
    },
    infinityToken: async(request, response) => {
        try {
            const { username, password } = request.body;

            const user = await User.findOne({username});
    
            if(!user) {
                return response.json({
                    code: 404,
                    msg: "El usuario no existe."
                });
            }

            const validPassword = await user.validatePassword(password);
    
            if(!validPassword) {
                return response.json({
                    code: 401,
                    msg: "Contraseña incorrecta."
                });
            }
    
            const token = jwt.generateInfiniteToken({
                uid: user._id
            });
    
            return response.json({
                code: 200,
                token
            });
        }
        catch(error) {
            console.log(error);
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de generar el token infinito."
            });
        }
    },
    resetPassword: async(request, response) => {
        try {
            const { username } = request.body;

            const user = await User.findOne({username});
    
            if(!user) {
                return response.json({
                    code: 404,
                    msg: "El usuario no existe."
                });
            }
    
            const token = jwt.generateToken({
                uid: user._id
            }, {
                expiresIn: "30m"
            });
    
            return response.json({
                code: 200,
                token
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de crear una solicitud de cambio de contraseña."
            });
        }
    },
    changePassword: async(request, response) => {
        try {
            const {token, password} = request.body;

            const verification = jwt.verifyToken(token);

            if(verification.code != 200) {
                return response.json(verification);
            }

            await User.findByIdAndUpdate(verification.decoded.uid, {password});

            return response.json({
                code: 200,
                msg: "Contraseña cambiada exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de cambiar la contraseña."
            });
        }
    }
}

module.exports = authController;
