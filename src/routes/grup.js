const express = require('express');
const { createGrup } = require('../controllers/grupController');
const { validateCreateBody, validate }  = require('../requests/grup/requestCreate');

const Route = express.Router();

Route.post('/create',validateCreateBody, validate, createGrup);


module.exports = Route;

