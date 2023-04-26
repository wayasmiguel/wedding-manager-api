'use strict'

const Guest = require("../models/Guest");
const { Types } = require("mongoose");

const guestController = {
    create: async(request, response) => {
        try {
            const { prefix, name, lastName, phone, group, age, table, companions } = request.body;

            let code = (lastName.split(" ")[0].substring(0, 2) + name.split(" ")[0].substring(0, 1) + phone.substring(phone.length - 3)).toUpperCase();

            await Guest.create({ prefix, name, lastName, phone, code, group, age, table, companions });

            return response.json({
                code: 200,
                msg: "Invitado creado exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de crear un invitado.",
                error: error.message
            });
        }
    },
    get: async(request, response) => {     
        try {
            const { id } = request.params;

            if(id) {
                const ObjectId = new Types.ObjectId( (id.length < 12) ? "123456789012" : id );
    
                const guest = await Guest.findOne( { $or: [ { '_id': ObjectId }, { 'phone': id }, { 'code': id } ] } ).lean();

                /*.select({ 
                    confirmation: 0,
                    group: 0,
                    age: 0,
                    table: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    _id: 0,
                    __v: 0
                });*/

                guest.stage = guest.confirmation.secondFilter.status != 1 ? 2 : guest.confirmation.firstFilter.status != 1 ? 1 : 0;

                const { confirmation, group, age, table, createdAt, updatedAt, _id, __v, ...dataFiltered } = guest;
    
                if(guest) {
                    return response.json({
                        code: 200,
                        guest: dataFiltered
                    });
                }
                else {
                    return response.json({
                        code: 404,
                        msg: "Invitado no encontrado."
                    });
                }
            }
            else {
                const guests = await Guest.find();

                return response.json({
                    code: 200,
                    guests
                });
            }
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de obtener un invitado.",
                error: error.message
            });
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { prefix, name, lastName, phone, group, age, table, companions } = request.body;

            const guest = await Guest.findByIdAndUpdate(id, { prefix, name, lastName, phone, group, age, table, companions });

            if(guest) {
                return response.json({
                    code: 200,
                    msg: "Invitado actualizado exitosamente."
                });
            }
            else {
                return response.json({
                    code: 404,
                    msg: "Invitado no encontrado."
                });
            }
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de actualizar un invitado.",
                error: error.message
            });
        }
    },
    delete: async(request, response) => {
        try {
            const { id } = request.params;

            const guest = await Guest.findByIdAndRemove(id);

            if(guest) {
                return response.json({
                    code: 200,
                    msg: "Invitado eliminado exitosamente."
                });
            }
            else {
                return response.json({
                    code: 404,
                    msg: "Invitado no encontrado."
                });
            }
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de eliminar un invitado.",
                error: error.message
            });
        }
    },
    confirm: async(request, response) => {
        try {
            const { id } = request.params;
            const { companions, status } = request.body;

            const ObjectId = new Types.ObjectId( (id.length < 12) ? "123456789012" : id );

            const guest = await Guest.findOne( { $or: [ { '_id': ObjectId }, { 'phone': id }, { 'code': id } ] } );

            if(guest) {
                let filterStage = 'firstFilter';

                if (guest.confirmation.firstFilter.status !== 1) {
                    filterStage = 'secondFilter';
                }

                // {
                //     confirmation: {
                //         firstFilter: {
                //             companions: {
                //                 adults: 0,
                //                 children: 0
                //             },
                //             status: 1
                //         },
                //         secondFilter: {
                //             companions: {
                //                 adults: 0,
                //                 children: 0
                //             },
                //             status: 1
                //         }
                //     }
                // }

                await Guest.findByIdAndUpdate(guest._id, { $set: { [`confirmation.${filterStage}`]: {
                    date: Date.now(),
                    companions,
                    status
                }} });

                return response.json({
                    code: 200,
                    msg: "Asistencia confirmada exitosamente."
                });
            }
            else {
                return response.json({
                    code: 404,
                    msg: "Invitado no encontrado."
                });
            }
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de confirmar la asistencia.",
                error: error.message
            });
        }
    }
}

module.exports = guestController;