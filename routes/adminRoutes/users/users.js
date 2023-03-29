const express = require("express");
const router = express.Router();
const User = require("../../models/user");
//All Players Route

module.exports = (io) => {

    router.get('/', (req, res) => {
        res.render("login/index.ejs")
    })

    router.post('/',async (req, res) => {
    })
    return router;
};
