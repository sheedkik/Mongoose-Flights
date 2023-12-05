const Flight = require("../models/flight")

module.exports = {
    index,
    show,
    new: newFlight,
    create,
    delete: deleteFlight
}


function index(req, res) {
    res.render("flights/index", {
        flights: Flight.getAll(),
        title: "Flights List"
    })
}

function show(req, res) {
    res.render("flights/show", {
        flight: Flight.getOne(req.params.id),
        title: "Flight Details"
    })
}

function newFlight(req, res) {
    res.render("flights/new", {title: "New Flight"})
}

function create(req,res) {
    Flight.create(req.body)
    res.redirect("/flights")
}

function deleteFlight(req,res) {
    Flight.deleteOne(req.params.id)
    res.redirect('/flights')
}