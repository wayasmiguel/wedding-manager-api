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

const guestController = require("../app/http/controllers/guestController")

//Routes

//Guest routes
route.group('/guest', (guest) => {
    guest.post('/', guestController.create);
    guest.get('/:id', guestController.get);
    guest.put('/:id', guestController.update);
    guest.delete('/:id', guestController.delete);
});

//Settings routes
route.group('/setting', (setting) => {
    setting.get('/', guestController.get);
    setting.put('/:id', guestController.update);
});

module.exports = route;