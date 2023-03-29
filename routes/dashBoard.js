const express = require("express");
const {authorize} = require("../auth");
const router = express.Router();

module.exports = (io) => {
    router.get('/', authorize ,(req, res) => {
        res.render('homePage/dashBoard',{isAdmin : req.session.isAdmin})
    })

    return router;
};