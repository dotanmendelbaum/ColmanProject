const express = require("express");

const router = express.Router();
const controller = require("../../controllers/logout")
module.exports = (io) => {

    router.route('/')
        .get(controller.logout)

    return router;
}