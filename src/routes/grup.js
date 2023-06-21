const express = require('express');
const { createGrup,getGrup , updateGrup , deleteGrup } = require('../controllers/grupController');
const { validateCreateBody,validateParam, validate }  = require('../requests/grup/requestCreate');

const Route = express.Router();

Route.post('/create',validateCreateBody, validate, createGrup);
Route.get('/:nama?',validateParam,validate,getGrup);
Route.patch('/:nama',validateCreateBody,validate,updateGrup);
Route.delete('/:nama',deleteGrup);
module.exports = Route;

