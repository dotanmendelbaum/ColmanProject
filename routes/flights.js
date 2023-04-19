const express= require('express')
const router = express.Router();
const FlightsC = require('../controllers/flights');
const {validateFlightData} = require("../services/flights")
const  OrderC = require("../controllers/orders")
const {authorize, authAdmin} = require("../auth");

module.exports = (io) => {

    router.route('/')
        .get(authorize, FlightsC.getAllFlightsPage)
        .post(authorize, authAdmin, validateFlightData, FlightsC.createFlight);

    router.route('/:flightID')
        .get(FlightsC.getFlight)
        .put(validateFlightData,  (req, res) => FlightsC.updateFlightById(req, res, io))
        .delete(FlightsC.deleteFlight);


    router.route('/book')
        .post(authorize , OrderC.createOrder);

    return router;
}
