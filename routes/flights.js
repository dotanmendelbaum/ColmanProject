const express= require('express')
const router = express.Router();
const FlightsC = require('../controllers/flights');
const {validateFlightData} = require("../services/flights")

const {authorize, authAdmin} = require("../auth");

module.exports = (io) => {

    router.route('/')
        .get(authorize, FlightsC.getAllFlightsPage)
        .post(authorize, authAdmin, validateFlightData, FlightsC.createFlight);

    router.route('/:flightID')
        .get(FlightsC.getFlight)
        .put(validateFlightData,  (req, res) => FlightsC.updateFlightById(req, res, io))
        .delete(FlightsC.deleteFlight);

    return router;
}
