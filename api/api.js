module.exports = function api(io){

    const express = require('express');
    const api = express.Router();
    const formidable = require('formidable');
    const pictureModel = require("../models/pictureModel.js");
    const util = require("util");

    const config = require("../config.js");

    api.get("/", (req,res) => {
        res.json({
            "name":config.name,
            "apiVersion": config.apiVersion,
            "Owner": config.owner
        });
    });

    api.get("/index", (req,res) => {
        res.json({
            "name":config.name,
            "apiVersion": config.apiVersion,
            "Owner": config.owner
        });
    });


    api.post("/upload", (req, res) => {
        let form = new formidable.IncomingForm();

        form.uploadDir = config.path + "/public/uploads";
        form.keepExtensions = true;
        form.maxFieldsSize = 20 * 1024 * 1024;
        form.maxFields = 1000;

        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            form.openedFiles.forEach((file) => {

                let origFileName = file.name;
                let fileName = (file.path.substring(config.path.length + "/public".length, file.path.length));
                let album = fields.album;
                let tags;
                if(typeof(fields["tags-input"]) != "undefined"){
                    tags = fields["tags-input"].split(",");
                }

                let picture = {
                    origFileName: origFileName,
                    fileName: fileName,
                    album: album,
                    tag: tags
                }

                let picturem = new pictureModel(picture);

                picturem.save((err) => {
                    if (err) throw err;
                    io.emit('new', picture);
                });

            });
            res.redirect("/pictures/upload.html");
        });

        form.on('file', (name, file) => {
            console.log("Upload " + file.name);
        });

    });

    api.get("/photos", (req,res) => {
        pictureModel.find((err, data) => {
            if (err) throw err;

            res.json(data);
        });
    });

    return api;

}