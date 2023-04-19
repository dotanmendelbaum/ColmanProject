const flight = require('../services/flights');
const flightsModal= require('../models/flights')
const crypto = require('crypto');

/*const index = (req, res) => {
    res.render("../views/flights.js", { flight: flight.getFlights() });
 }*/
const createFlight= async (req, res)=> {
    console.log("got request")

    const newFlight= await flight.createFlight(req.body.flightNumber,
        req.body.flightDate,
        req.body.hour,
        req.body.Gate,
        req.body.Destination,
        req.body.Origin,
        req.body.flightPrice,
        req.body.ArrivingDate,
        req.body.NumberOfSeats,
        req.body.ArrivingHour)
    console.log("flight created")

    res.status(200).json(newFlight);
}

const getAllFlightsPage = async (req, res) => {
    const allFlights = await flight.getFlights();

    // Render the page with the list of flights
    console.log(allFlights)
    res.render('flights/allFlights', {isAdmin: req.session.isAdmin, flights: allFlights })
}
const getNewFlightPage = async (req, res) => {
    // Render the page with the list of flights
    res.render('flights/flights', {isAdmin: req.session.isAdmin})
}


const getFlights= async (req, res)=> {
    const newFlight= await flight.getFlights()
    res.json(newFlight)
}
const getFlight= async (req, res)=> {
    const newFlight= await flight.getFlightById(req.params.flightID)
    res.json(newFlight)
}
const updateFlightById = async (req, res, io)=> {

    const newFlight= await flight.updateFlightById(req, res)
    res.status(200).json(newFlight)
    io.emit("flight-changed", newFlight)
}
const deleteFlight= async (req, res)=> {
    console.log("delete")
    const newFlight= await flight.deleteFlight(req.params.flightID)
    res.status(200).json("delete succesfull")
}

const emitflightChange = (req, res, io) =>{
    io.emit("flight-changed", )
}
module.exports = {
    createFlight,
    getAllFlightsPage,
    getNewFlightPage,
    getFlights,
    getFlight,
    updateFlightById,
    deleteFlight
    //  index
};