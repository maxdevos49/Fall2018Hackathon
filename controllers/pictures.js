module.exports = function routes(io){
<<<<<<< HEAD
=======

const express = require('express');
const router = express.Router();
const pictureModel = require('../models/pictureModel');
>>>>>>> 7a014ad16d9c2a85a10d756c9701f4c85888d76d

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
<<<<<<< HEAD

    return router;
=======
});
return router;
>>>>>>> 7a014ad16d9c2a85a10d756c9701f4c85888d76d
}