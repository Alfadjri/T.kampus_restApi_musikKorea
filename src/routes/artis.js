const express = require('express');
const {createArtis,getValue,getUpdate} = require('../controllers/artisController');
const { validateCreateBody,validateParam, validate} = require('../requests/artis/requestCreate');

const Route = express.Router();

Route.post('/create',validateCreateBody,validate,createArtis);
Route.get('/:nama?',validateParam,validate,getValue);
Route.patch('/:nama',validateParam,validateCreateBody,validate,getUpdate);
module.exports = Route;
