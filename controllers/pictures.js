const express = require('express');
const router = express.Router();
const pictureModel = require('../models/pictureModel');

router.get("/upload.html", (req, res) => {
    res.render("pictures/upload");
});

router.get("/view.html", (req, res) => {
    pictureModel.find((err, data) => {
        if (err) throw err;

        let model = {photos: data};

        res.render("pictures/view", model);
    });
});

module.exports = router;