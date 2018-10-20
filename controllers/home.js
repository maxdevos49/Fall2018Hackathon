const express = require('express');
const router = express.Router();
const io = require('socket.io');

router.get("/index.html", (req,res) => {
    res.render("home/index");
});


router.get("/", (req,res) => {
    res.render("home/index");
    console.log("emmiting")
    io.sockets.emit('m','hey');
});

module.exports = router;