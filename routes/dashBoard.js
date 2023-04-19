const express = require("express");
const {authorize} = require("../auth");
const FlightsC = require("../controllers/flights");
const router = express.Router();

module.exports = (io) => {
    router.route('/')
        .get(authorize ,(req, res) => {
        res.render('homePage/dashBoard',{isAdmin : req.session.isAdmin})
    })

    return router;
};