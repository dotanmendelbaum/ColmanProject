const flight = require('../services/flights');

/*const index = (req, res) => {
    res.render("../views/flights.js", { flight: flight.getFlights() });
 }*/
const createFlight= async (req, res)=> {
    const newFlight= await flight.createFlight(req.body.flightID,
        req.body.flightDate,
        req.body.hour,
        req.body.Gate,
        req.body.Destination,
        req.body.Origin,
        req.body.flightPrice,
        req.body.ArrivingDate,
        req.body.NumberOfSeats,
        req.body.ArrivingHour)

    res.status(200).json("new flight created successfully")
}

const getAllFlightsPage = async (req, res) => {
    const allFlights = await flight.getFlights();

    // Render the page with the list of flights
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
const updateFlightByGate= async (req, res)=> {
    const newFlight= await flight.updateFlightByGate(req.params.Gate)
    res.json(newFlight)
}
const deleteFlight= async (req, res)=> {
    console.log("delete")
    const newFlight= await flight.deleteFlight(req.params.flightID)
    res.status(200).json("delete succesfull")
}
module.exports = {
    createFlight,
    getAllFlightsPage,
    getNewFlightPage,
    getFlights,
    getFlight,
    updateFlightByGate,
    deleteFlight
    //  index
};