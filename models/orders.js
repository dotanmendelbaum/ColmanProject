
 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    IDClient : {
        type: String,
        required: true
    },
    FullName:
    {
     type:String,
     required: true
    },
    Price:
    {
    type: Number,
    required: true
    },
    NumberOfPassengers:
   {
    type:Number,
    require:true
   },
   FlightID:
   {
    type:Number,
    required: true
   },
   DateOfOrder:
   {
    type:Date,
    default: Date.now
   },

});

module.exports = mongoose.model('Orders', orderSchema);
    