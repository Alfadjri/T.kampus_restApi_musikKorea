const express = require('express');
const {createArtis} = require('../controllers/artisController');
const { validateCreateBody, validate} = require('../requests/artis/requestCreate');

const Route = express.Router();

Route.post('/create',validateCreateBody,validate,createArtis);


module.exports = Route;
