const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Airports', airportSchema);