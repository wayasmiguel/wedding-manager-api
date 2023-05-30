'use strict'

const Guest = require("../models/Guest");
const { Types } = require("mongoose");

const guestController = {
    create: async(request, response) => {
        try {
            const { name, lastName, phone, group, age, table, companions } = request.body;

            const code = (lastName.split(" ")[0].substring(0, 2) + name.split(" ")[0].substring(0, 1) + phone.substring(phone.length - 3)).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            await Guest.create({ name, lastName, phone, code, group, age, table, companions });

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
    
                if(guest) {

                    if (guest.confirmation.firstFilter.status !== 1 && guest.confirmation.secondFilter.status !== 1) {
                        return response.json({
                            code: 202,
                            msg: `Invitado ${guest.confirmation.secondFilter.status ? 'confirmado' : 'declinado'}.`
                        });
                    }

                    if (guest.confirmation.firstFilter.status === 0) {
                        return response.json({
                            code: 204,
                            msg: "Invitado declinado."
                        });
                    }

                    // guest.stage = guest.confirmation.secondFilter.status != 1 ? 2 : guest.confirmation.firstFilter.status != 1 ? 1 : 0;

                    const { confirmation, group, age, table, createdAt, updatedAt, _id, __v, ...dataFiltered } = guest;
                    
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
            const { name, lastName, phone, group, age, table, companions } = request.body;

            const code = (lastName.split(" ")[0].substring(0, 2) + name.split(" ")[0].substring(0, 1) + phone.substring(phone.length - 3)).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            const guest = await Guest.findByIdAndUpdate(id, { name, lastName, phone, code, group, age, table, companions });

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
            const guestsIgnored = ['WAM811', '5522483811', 'SOA555', '5584009555'];

            const ObjectId = new Types.ObjectId( (id.length < 12) ? "123456789012" : id );

            if(guestsIgnored.includes(id)) {
                return response.json({
                    code: 200,
                    msg: `Asistencia ${status ? 'confirmada' : 'declinada'} exitosamente.`
                });
            }

            const guest = await Guest.findOne( { $or: [ { '_id': ObjectId }, { 'phone': id }, { 'code': id } ] } );

            if(guest) {
                let filterStage = 'firstFilter';

                if (guest.confirmation.firstFilter.status !== 1) {
                    filterStage = 'secondFilter';
                }

                await Guest.findByIdAndUpdate(guest._id, { $set: { [`confirmation.${filterStage}`]: {
                    date: Date.now(),
                    companions,
                    status
                }} });

                return response.json({
                    code: 200,
                    msg: `Asistencia ${status ? 'confirmada' : 'declinada'} exitosamente.`
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
    },
    restartConfirmation: async(_, response) => {
        try {
            const guests = await Guest.find();

            if(guests) {
                let defaultData = {
                    date: null,
                    companions: {
                        adults: 0,
                        children: 0
                    },
                    status: 1
                };

                await Guest.updateMany({}, { $set: { 'confirmation.firstFilter': defaultData, 'confirmation.secondFilter': defaultData } });

                return response.json({
                    code: 200,
                    msg: `Asistencia reiniciada exitosamente.`
                });
            }
            else {
                return response.json({
                    code: 404,
                    msg: "No se han encontrado invitados."
                });
            }
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de reiniciar la asistencia.",
                error: error.message
            });
        }
    }
}

module.exports = guestController;