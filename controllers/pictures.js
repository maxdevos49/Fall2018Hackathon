const express = require('express');
const router = express.Router();

router.get("/upload.html", (req, res) => {
    res.render("pictures/upload");
});

module.exports = router;