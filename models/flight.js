const mongoose = require('mongoose');
const  Schema  = mongoose.Schema


const destinationSchema = new Schema({
    airport: {
        type: String,
        required: true,
        unique: true,
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN", "PHX" ]
    },
    arrival: {
        type: Date,
        required: true
    }
})


const flights = new Schema({
    title: { type: String, required: true},
  airline: {
    type: String,
    required: true,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    required: true,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN", "PHX"],
    default: function() {
        return "DEN"
    }
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,

  },
  departs: {
    type: Date,
    required: true,
    default: function() {
        const oneYearFuture = new Date()
        oneYearFuture.setFullYear(oneYearFuture.getFullYear() + 1)
        return oneYearFuture
    }
  }
}, {
  timestamps: true
});

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne
}

function getAll() {
    return flights
}

function getOne(id) {
    id = parseInt(id)
    return flights.find(flight => flight.id === id)
}

function create(skill) {
    flights.id = Date.now() % 1000000
    flights.done = false;
    flights.push(skill)
}

function deleteOne(id) {
    id = parseInt(id)
    const idx = flights.findIndex(flight => flight.id === id)
    flights.splice(idx, 1)
}
module.exports = mongoose.model('Flight', flights);