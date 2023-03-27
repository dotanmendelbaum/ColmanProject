const express = require("express");
const router = express.Router();

module.exports = (io) => {
    router.get('/', (req, res) => {
        res.render('homePage/dashBoard')
    })

    return router;
};