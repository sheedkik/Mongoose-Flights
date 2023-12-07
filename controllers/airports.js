const Airport = require('../models/airport');
const Flight = require('../models/flight');

module.exports = {
  new: newAirport,
  create,
  addToFlight
};

async function addToFlight(req, res) {
  const flight = await Flight.findById(req.params.id);
  flight.airport.push(req.body.performerId);
  await flight.save();
  res.redirect(`/flights/${flight._id}`);
}

async function newAirport(req, res) {
  const airports = await Airport.find({}).sort('name');
  res.render('airports/new', { title: 'Add Airport', airports });
}

async function create(req, res) {
  try {
    await Airport.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/airports/new');
}