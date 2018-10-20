
module.exports = function routes(io){

    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');

    //config settings
    const config = require('./config.js');

    //Document Routes
    const ROUTES_home = require("./controllers/home.js");
    const ROUTES_picture = require("./controllers/pictures.js");

    //api routes
    const API_index = require("./api/api.js");


    //connect to the database using Mongoose
    mongoose.connect(config.dbUrl, {useNewUrlParser: true});

    //middleware
    router.use(express.static('./public'));
    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());

    //use document routes
    router.use('/', ROUTES_home);
    router.use('/pictures', ROUTES_picture(io));

    //use api routes
    router.use("/api", API_index(io));

    //respond with a 404 api request if nothing was found
    router.use('/api', (req,res) => {
        
        res.status(404);
        res.json({"error":"Bad request!"});

    });

    //respond with a 404 request if the document was not found
    router.use('/', (req,res) => {

        res.status(404);
        res.render("status/404");

    });

    return router;

}
