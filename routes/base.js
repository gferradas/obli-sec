const express = require("express");
const router = express.Router();

const path = "/";

router.get(path, (req, res) => {
    res.send("Hello World");
});

module.exports = { router, path };
