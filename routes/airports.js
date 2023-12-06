const express = require('express');
const router = express.Router();
const airportsCtrl = require('../controllers/airports');


router.get('/airports/new', airportsCtrl.new);
router.post('/airports', airportsCtrl.create);
router.post('/flights/:id/airports', airportsCtrl.addToFlight);

module.exports = router;