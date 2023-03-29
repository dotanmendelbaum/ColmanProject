const express= require('express')
const router = express.Router();
const FlightsC = require('../controllers/flights');
const {validateFlightData} = require("../services/flights")
const {authorize, authAdmin} = require("../auth");

module.exports = (io) => {

    router.route('/')
        .get(authorize, FlightsC.getAllFlightsPage)

    router.route('/new')
        .post(authorize, authAdmin, validateFlightData, FlightsC.createFlight);

    router.route('/:flightID')
        .get(FlightsC.getFlight)
        .put(FlightsC.updateFlightByGate)
        .delete(FlightsC.deleteFlight);

    return router;
}
