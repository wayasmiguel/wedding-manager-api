'use strict'

const settingController = {
    get: async(request, response) => {
        try {
            return response.json({
                code: 200,
                msg: "Ajustes obtenidos exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de obtener los ajustes."
            });
        }
    },
    update: async(request, response) => {
        try {
            return response.json({
                code: 200,
                msg: "Ajustes actualizados exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de actualizar los ajustes."
            });
        }
    }
}

module.exports = settingController;