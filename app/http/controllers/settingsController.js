'use strict'

const { Settings, CountDown, Itinerary, GettingThere, GiftTable, HashTag, Confirmation, User } = require("../models");
const cleanObject = require("../helpers/cleanObject");

const { doc, updateDoc } = require("firebase/firestore");
const db_firebase = require("../../../config/firebase");

const settingController = {
    create: async(request, response) => {
        try {
            const { countDown, itinerary, gettingThere, giftTable, hashTag, confirmation } = request.body;
            const { token } = request.headers;

            const _countDown = await CountDown.create(countDown);
            const _itinerary = await Itinerary.create(itinerary);
            const _gettingThere = await GettingThere.create(gettingThere);
            const _giftTable = await GiftTable.create(giftTable);
            const _hashTag = await HashTag.create(hashTag);
            const _confirmation = await Confirmation.create(confirmation);
            
            const _settings = await Settings.create({
                user:           token,
                countDown:      _countDown._id,
                itinerary:      _itinerary._id,
                gettingThere:   _gettingThere._id,
                giftTable:      _giftTable._id,
                hashTag:        _hashTag._id,
                confirmation:   _confirmation._id
            });

            await User.findByIdAndUpdate(token, {
                settings: _settings._id
            });

            return response.json({
                code: 200,
                msg: "Ajustes guardados exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de guardar los ajustes.",
                error: error
            });
        }
    },
    get: async(request, response) => {
        try {
            const { id } = request.params;

            let settings = await Settings.findById(id).lean({ autopopulate: true });

            if (settings) {
                settings = cleanObject(settings, ['_id', 'createdAt', 'updatedAt', '__v']);
            }

            return response.json({
                code: 200,
                msg: "Ajustes obtenidos exitosamente.",
                settings
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de obtener los ajustes.",
                error: error
            });
        }
    },
    update: async(request, response) => {
        try {
            const { id } = request.params;
            const { countDown, itinerary, gettingThere, giftTable, hashTag, confirmation } = request.body;
            const { token } = request.headers;

            let settings = await Settings.findById(id);

            await CountDown.findByIdAndUpdate(settings.countDown._id, countDown);
            await Itinerary.findByIdAndUpdate(settings.itinerary._id, itinerary);
            await GettingThere.findByIdAndUpdate(settings.gettingThere._id, gettingThere);
            await GiftTable.findByIdAndUpdate(settings.giftTable._id, giftTable);
            await HashTag.findByIdAndUpdate(settings.hashTag._id, hashTag);
            await Confirmation.findByIdAndUpdate(settings.confirmation._id, confirmation);

            settings = await Settings.findById(id).lean({ autopopulate: true });

            if (settings) {
                settings = cleanObject(settings, ['_id', 'createdAt', 'updatedAt', '__v']);
                delete settings["user"];
            }

            const user = await User.findById(token); 

            const settingsDoc = doc(db_firebase, "Settings", user.settings_firebase);
            await updateDoc(settingsDoc, settings);

            return response.json({
                code: 200,
                msg: "Ajustes actualizados exitosamente."
            });
        }
        catch(error) {
            console.log(error);
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de actualizar los ajustes.",
                error: error
            });
        }
    },
    delete: async(request, response) => {
        try {
            const { id } = request.params;
            const { token } = request.headers;

            const settings = await Settings.findById(id);

            const { countDown, itinerary, gettingThere, giftTable, hashTag, confirmation } = settings;

            await CountDown.findByIdAndRemove(countDown._id);
            await Itinerary.findByIdAndRemove(itinerary._id);
            await GettingThere.findByIdAndRemove(gettingThere._id);
            await GiftTable.findByIdAndRemove(giftTable._id);
            await HashTag.findByIdAndRemove(hashTag._id);
            await Confirmation.findByIdAndRemove(confirmation._id);

            await Settings.findByIdAndRemove(id);

            await User.findByIdAndUpdate(token, {
                $unset: { settings: "" }
            }); 

            return response.json({
                code: 200,
                msg: "Ajustes eliminados exitosamente."
            });
        }
        catch(error) {
            return response.json({
                code: 500,
                msg: "Ha ocurrido un error al tratar de eliminar los ajustes."
            });
        }
    }
}

module.exports = settingController;