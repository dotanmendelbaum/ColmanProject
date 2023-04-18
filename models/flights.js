/*const flights = [
    {flightID: 3, flightDate: "23/12/2023", hour: "16:00", Gate: 7, Destination: 'London', Origin: "Israel", flightPrice: 4000, ArrivingDate:  23/12/23, NumberOfSeats: 3000, ArrivingHour: 20.00},
    {flightID: 2, flightDate: "23/04/2022", hour: "18:00", Gate: 3, Destination: 'Israel', Origin: "Paris", flightPrice: 3000, ArrivingDate:  23/04/22, NumberOfSeats: 2000, ArrivingHour: 21.00},
    {flightID: 1, flightDate: "13/02/2023", hour: "14:00", Gate: 1, Destination: 'Israel', Origin: "Italy", flightPrice: 2000, ArrivingDate:  13/02/22, NumberOfSeats: 1000, ArrivingHour: 17.00}
];*/
const mongoose= require('mongoose');
Schema=mongoose.Schema;
const flight= new Schema({
    flightNumber: {
        required: true,
        type: Number,
        //length: 9
    },
    flightDate: {
    type: Date,
    default: Date.now ,
    required: true
    },
    hour: {
     required: true,
     type: String
    },
    Gate:
    {
        type: String,
        required: true
    },
    Destination:
    {
        type: String,
        required: true
    },
    Origin:
    {
        default: 'Israel',
        type: String ,
        required: true
    },
    flightPrice:
    {
        type: Number,
        required: true
    },
    ArrivingDate:
    {
     type: Date,
     default: Date.now ,
    required: true
    },
    NumberOfSeats:
    {
        type: Number,
        required: true
    },
    ArrivingHour:
    {
        type: String,
        required: true
    }

})
module.exports= mongoose.model('flight', flight)
