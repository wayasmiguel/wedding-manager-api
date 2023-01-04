'use strict'

const guestController = {
    create: async(request, response) => {
        try {
            return response.json({
                code: 200,
                msg: "Invitado creado exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de crear un invitado."
            });
        }
    },
    get: async(request, response) => {

    },
    update: async(request, response) => {

    },
    delete: async(request, response) => {

    }
}

module.exports = guestController;