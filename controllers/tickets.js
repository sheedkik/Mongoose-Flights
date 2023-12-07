const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
  addToFlight
};

async function addToFlight(req, res) {
    try {
      const flight = await Flight.findById(req.params.id);
      const ticket = await Ticket.findById(req.body.ticketId);
      
      console.log("Flight ID:", flight)
      console.log("Ticket ID:", ticket)
      if (ticket) {
        flight.tickets.push(ticket._id);
        await flight.save();
        res.redirect(`/flights/${flight._id}`);
      } else {
        // Handle the case where the ticket with the provided ID is not found
        console.error('Ticket not found');
        res.status(404).send('Ticket not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error' + err.message);
    }

  }


async function newTicket(req, res) {
    try {
        const allTickets = await Ticket.find({});
        res.render('tickets/new', { title: 'Add Ticket', tickets: allTickets });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }

async function create(req, res) {
  try {
    await Ticket.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/tickets/new');
}
