const express = require('express');
const app = express();
const http = require('http');
const ip = require('ip');
const routes = require('./routes.js');

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

//view engine
app.set('view engine', 'vash');

//set the routes for the server to use
app.use('/', routes);

//start the server
server.listen(PORT, function () {
    console.log(`Hackathon Fall 2018 at ${ip.address()}:${PORT}`);
});
