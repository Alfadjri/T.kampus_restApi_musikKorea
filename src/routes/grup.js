const express = require('express');
const { createGrup, getAllGrup , searchGrup , updateGrup , deleteGrup } = require('../controllers/grupController');
const { validateCreateBody, validate }  = require('../requests/grup/requestCreate');

const Route = express.Router();

Route.post('/create',validateCreateBody, validate, createGrup);
Route.get('/',getAllGrup);
Route.get('/:nama',searchGrup);
Route.patch('/:nama',validateCreateBody,validate,updateGrup);
Route.delete('/:nama',deleteGrup);
module.exports = Route;

