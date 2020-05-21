"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const models_1 = require("./models");
const utils_1 = require("./utils/utils");
const server = http.createServer(app_1.default);
const port = utils_1.normalizePort(process.env.port || 3000);
const host = process.env.host || '127.0.0.1';
models_1.default.sequelize.sync()
    .then(() => {
    server.listen(port, host);
    server.on('error', utils_1.onError(server));
    server.on('listening', utils_1.onListening(server));
});
