const Flight = require("../models/flight")
const Ticket = require("../models/ticket")

module.exports = {
    index,
    show,
    new: newFlight,
    create,
    delete: deleteFlight
}



async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
  }

async function show(req, res) {
    // const flight = await Flight.findById(req.params.id).populate('airline');
    // const flightNo = await Flight.findById(req.params.id).populate('flightNo');
    // const airport = await Flight.findById(req.params.id).populate('airport');
    // const departs = await Flight.findById(req.params.id).populate('departs');
    // const flightTickets = await Flight.findById(req.params.id).populate('tickets');
    // const tickets = await Ticket.find({_id: { $nin: flight.tickets } }).sort("seat")
    
    // res.render('flights/show', { title: 'Flight Detail', flight, flightNo, airport, departs, flightTickets, tickets });
    const flight = await Flight.findById(req.params.id).populate('airline').populate('tickets');

    const flightTickets = await Ticket.find({ _id: { $nin: flight.tickets } }).sort("seat");

    res.render('flights/show', { title: 'Flight Detail', flight, flightTickets, tickets: flightTickets });
    console.log(flight.tickets)
  }

function newFlight(req, res) {
    res.render("flights/new", {title: "New Flight"})
    // res.render("airports/new", {airport: "new Airport"})
}


async function create(req, res) {
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {
      // Update this line because now we need the _id of the new movie
      const flight = await Flight.create(req.body);
      // Redirect to the new movie's show functionality 
      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('flights/new', { errorMsg: err.message });
    }
  }


function deleteFlight(req,res) {
    Flight.deleteOne(req.params.id)
    res.redirect('/flights')
}