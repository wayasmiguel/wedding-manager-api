'use strict'

/*
|--------------------------------------------------------------------------
| Api Routes
|--------------------------------------------------------------------------
*/

const express = require("express");
require('express-group-routes');
const route = express.Router();

//Middlewares

const verifyToken = require("../app/http/middlewares/verifyToken");
route.use(verifyToken);

//Controllers

const guestController = require("../app/http/controllers/guestController");
const settingsController = require("../app/http/controllers/settingsController")

//Routes

//Guest routes
route.group('/guest', (guest) => {
    guest.post('/', guestController.create);
    guest.get('/:id?', guestController.get);
    guest.put('/:id', guestController.update);
    guest.delete('/:id', guestController.delete);
    guest.post('/confirm/:id', guestController.confirm);
    guest.get('/QR/:id', guestController.getDataByQR);
    guest.post('/confirmAttendance/:id', guestController.confirmAttendance);
    guest.patch('/restart-confirmation', guestController.restartConfirmation);
    guest.patch('/test', guestController.test);
});

//Settings routes
route.group('/settings', (settings) => {
    settings.post('/', settingsController.create);
    settings.get('/:id', settingsController.get);
    settings.put('/:id', settingsController.update);
    settings.delete('/:id', settingsController.delete);
});

module.exports = route;