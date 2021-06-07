'use strict'

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

const express = require("express");
const route = express.Router();

//Controllers

const authController = require("../app/http/controllers/authController");
const statusController = require("../app/http/controllers/statusController");

//Routes

route.post('/signin', authController.sigin);
route.post('/login', authController.login);
route.post('/generateInfinityToken', authController.infinityToken);
route.get("/status", statusController.getStatus);
route.post("/update-status", statusController.updateStatus);

module.exports = route;