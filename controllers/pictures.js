module.exports = function routes(io){

    const express = require('express');
    const router = express.Router();
    const pictureModel = require('../models/pictureModel');

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

    return router;
}