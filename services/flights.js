const flight= require('../models/flights')
const createFlight= async(flightID, flightDate,hour,Gate, Destination, Origin,flightPrice,ArrivingDate,NumberOfSeats, ArrivingHour)=>
{
    const Flight= new flight({flightID:flightID,flightDate:flightDate,hour:hour,Gate:Gate,Destination:Destination,Origin:Origin,flightPrice:flightPrice, ArrivingDate:ArrivingDate,NumberOfSeats:NumberOfSeats,ArrivingHour:ArrivingHour  })
    return await Flight.save();
}
const getFlightById= async(flightID)=>
{
    return await flight.findById(flightID)
}
const getFlights= async()=>
{
    return await flight.find({});
}
const updateFlightById=async(req, res)=>
{
    const currentFlight = await getFlightById(req.params.flightID)
    if(!currentFlight)
        return null
    Object.assign(currentFlight, res.body)

}
function validateFlightData(req, res, next)
{
    // Check that all fields are present and not empty
    if (!req.body.flightID ||
        !req.body.flightDate ||
        !req.body.hour ||
        !req.body.Gate ||
        !req.body.Destination ||
        !req.body.Origin ||
        !req.body.flightPrice ||
        !req.body.ArrivingDate ||
        !req.body.NumberOfSeats ||
        !req.body.ArrivingHour) {
        return { status: 400, message: 'All fields are required' };
    }

    // Check that the flight date is not in the past
    var flightDate = new Date(req.body.flightDate);
    var currentDate = new Date();
    if (flightDate < currentDate) {
        return res.status(400).json('Flight date cannot be in the past');
    }

    // Check that the arrival date is after the flight date
    var arrivingDate = new Date(req.body.ArrivingDate);
    if (arrivingDate < flightDate) {
        return res.status(400).json('Arrival date must be after flight date');
    }

    // Check that the flight price is not negative
    if (req.body.flightPrice < 0) {
        return res.status(400).json('Flight price cannot be negative');
    }

    // If all validation passes continue to the next function
    return next()
}

const deleteFlight= async(id)=>
{
    const deletedFlight=  await flight.findById(id)
    if(!deletedFlight)
        return null

    await deletedFlight.remove();
    return deletedFlight;
}
module.exports=
    {
        deleteFlight,
        getFlights,
        validateFlightData,
        getFlightById,
        createFlight,
        updateFlightById,
    }
