const express = require('express');
const api = express.Router();

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

module.exports = api;