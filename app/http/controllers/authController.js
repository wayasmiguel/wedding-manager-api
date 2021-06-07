'use strict'

const User = require("../models/User");
const jwt = require("../helpers/jwt");

const authController = {
    sigin: async(request, response) => {
        try{
            let {name, lastName, secondLastName, email, password} = request.body;

            await User.create({name, lastName, secondLastName, email, password});
    
            return response.json({
                code: 200,
                msg: "Usuario registrado exitosamente."
            });
        }
        catch(error){
            console.log(error);
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de guardar un usuario."
            });
        }
    },
    login: async(request, response) => {
        try{
            let {email, password} = request.body;

            let user = await User.findOne({email});
    
            if(!user){
                return response.json({
                    code: 404,
                    msg: "El correo electrónico no existe."
                });
            }

            let validPassword = await user.validatePassword(password);
    
            if(!validPassword){
                return response.json({
                    code: 401,
                    msg: "Contraseña incorrecta."
                });
            }
    
            let token = jwt.generateToken({
                uid: user.uid
            });
    
            return response.json({
                code: 200,
                token
            });
        }
        catch(error){
            console.log(error);
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de iniciar sesión."
            });
        }
    },
    infinityToken: async(request, response) => {
        try{
            let {email, password} = request.body;

            let user = await User.findOne({email});
    
            if(!user){
                return response.json({
                    code: 404,
                    msg: "El correo electrónico no existe."
                });
            }

            let validPassword = await user.validatePassword(password);
    
            if(!validPassword){
                return response.json({
                    code: 401,
                    msg: "Contraseña incorrecta."
                });
            }
    
            let token = jwt.generateInfiniteToken({
                uid: user.uid
            });
    
            return response.json({
                code: 200,
                token
            });
        }
        catch(error){
            console.log(error);
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de generar un token infinito."
            });
        }
    },
    resetPassword: async(request, response) => {
        try{
            let {email} = request.body;

            let user = await User.findOne({email});
    
            if(!user){
                return response.json({
                    code: 404,
                    msg: "El correo electrónico no existe."
                });
            }
    
            let token = jwt.generateToken({
                uid: user.uid
            }, {
                expiresIn: "30m"
            });
    
            return response.json({
                code: 200,
                token
            });
        }
        catch(error){
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de crear una solicitud de cambio de contraseña."
            });
        }
    },
    changePassword: async(request, response) => {
        try{
            let {token, password} = request.body;

            let verification = jwt.verifyToken(token);

            if(verification.code != 200){
                return response.json(verification);
            }

            await User.findByIdAndUpdate(verification.uid, {password});

            return response.json({
                code: 200,
                msg: "Contraseña cambiada exitosamente."
            });
        }
        catch(error){
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de cambiar la contraseña."
            });
        }
    }
}

module.exports = authController;
