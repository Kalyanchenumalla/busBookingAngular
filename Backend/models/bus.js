const mongoose = require('mongoose');

//bus
const busSchema = new mongoose.Schema({
    from:{ type: String},
    to:{ type: String},
    travelDate:{ type: String},
    busType:{ type: String},
    departure:{ type: String},
    arrival:{ type: String},
    date:{ type: String},
    available:{ type: Number},
    fare:{ type: Number},
    bookedSeats:{type: Array},
  })
  
  module.exports = mongoose.model('Bus', busSchema)
  
  //bus ends