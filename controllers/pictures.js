module.exports = function routes(io){

    const express = require('express');
    const router = express.Router();
    const pictureModel = require('../models/pictureModel');
    const url = require('url');  
    const querystring = require('querystring'); 

    router.get("/upload.html", (req, res) => {

        pictureModel.find().distinct('album',(err, data) => {
            if (err) throw err
            res.render("pictures/upload", {options: data});

        });

    });

    router.get("/view.html", (req, res) => {
        pictureModel.find((err, data) => {
            if (err) throw err;

            let model = {photos: data};

            res.render("pictures/view", model);
        });
    });

    router.get("/slideShow.html", (req, res) => {

        res.render("pictures/slideShow");
    });

    router.get("/singleView.html:id?", (req, res) => {

        let id = req.query.id;

        pictureModel.findById(id, (err, data) => {
            if (err) throw err;

            res.render("pictures/singleView", data);
        });
    });

    return router;
}