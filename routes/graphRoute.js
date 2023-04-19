const express= require('express')
const router = express.Router();
const FlightsC = require('../controllers/flights');
const {validateFlightData} = require("../services/flights")
const  OrderC = require("../controllers/orders")
const {authorize, authAdmin} = require("../auth");
const UserC = require("../controllers/users")

module.exports = (io) => {

    router.route('/flightsbymonth')
        .get(authorize, authAdmin, FlightsC.getFlightsByMonth)

    router.route('/usersbyage')
        .get(authorize, authAdmin, UserC.getUsersByAge)
    return router;
}
