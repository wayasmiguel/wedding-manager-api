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
    guest.get('/:id', guestController.get);
    guest.put('/:id', guestController.update);
    guest.delete('/:id', guestController.delete);
});

//Settings routes
route.group('/settings', (settings) => {
    settings.post('/', settingsController.create);
    settings.get('/:id', settingsController.get);
    settings.put('/:id', settingsController.update);
    settings.delete('/:id', settingsController.delete);
});

module.exports = route;