'use strict'

const server = require("./config/server");
require('dotenv').config();
new server().initialize();