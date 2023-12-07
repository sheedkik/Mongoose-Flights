const mongoose = require('mongoose');
const Schema  = mongoose.Schema

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
    },
    target: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const flightSchema = new Schema({
    title: { type: String, required: true},

  airline: {
    type: String,
    required: true,
    enum: ["American", "Southwest", "United"]
  },

  airport: {
    type: String,
    required: true,
  },

  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },

  tickets: [{
    type: Schema.Types.ObjectId,
    ref: "Ticket"
  }],

  departs: {
    type: Date,
    required: true,
    default: function() {
        const oneYearFuture = new Date()
        oneYearFuture.setFullYear(oneYearFuture.getFullYear() + 1)
        return oneYearFuture
    }
},

destinations: [destinationSchema]

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
module.exports = mongoose.model('Flight', flightSchema);