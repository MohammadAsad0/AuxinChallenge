const express = require('express');
const { getDataByContinent, getDataByCountry, getDataByCountryAndDate } = require('../controllers/covidController');
const auth = require('../middleware/auth');

const covidRouter = express.Router();

covidRouter.get('/getDataByContinent/:continent', auth, getDataByContinent);

covidRouter.get('/getDataByCountry/:country', auth, getDataByCountry);

covidRouter.get('/getDataByCountryAndDate/:country/:date', auth, getDataByCountryAndDate);


module.exports = covidRouter;