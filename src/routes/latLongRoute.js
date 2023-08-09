const express = require('express');
const latLong = express.Router();
const { checkingLatLong } = require('../controllers/latLongController');


// Task 4: To retrieve posts using latitude and longitude.

    // enter required latitude and longitude in request body to reterive all post with required latitude and longitude
latLong.get('/', checkingLatLong );

module.exports = latLong;