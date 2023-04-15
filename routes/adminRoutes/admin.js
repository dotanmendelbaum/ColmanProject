const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const {authorize, authAdmin} = require("../../auth");
const {getAllUsersPage} = require("../../controllers/users");
const {getAllFlightsPage} = require("../../controllers/flights")
//All Players Route

module.exports = (io) => {
    router.route('/users')
        .get(authorize, authAdmin, getAllUsersPage)

    router.route('/users/:id/edit')
        .get(authorize, authAdmin)
        .post()

    router.route('flights')
        .get(authorize, authAdmin, getAllFlightsPage)
    return router;
};
