const express = require('express');
const router = express.Router();

router.get("/upload.html", (req, res) => {
    res.render("pictures/upload");
});

router.get("/view.html", (req, res) => {
    res.render("pictures/view");
});

module.exports = router;