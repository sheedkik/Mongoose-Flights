const express = require('express');
const router = express.Router();
const detailsCtrl = require('../controllers/details');

// POST /movies/:id/reviews (create review for a movie)
router.post('/flights/:id/details', detailsCtrl.create);
module.exports = router;