const express = require('express');
const api = express.Router();
const formidable = require('formidable');

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

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = './pictures/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.redirect("/pictures/upload.html");
});

module.exports = api;