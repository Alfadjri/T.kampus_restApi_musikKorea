const express = require('express');
const {createVideo} = require('../controllers/videoController');
const {validateCreateBody , validate} = require('../requests/video/requestCreate');

const Route = express.Router();

Route.post('/create',validateCreateBody,validate,createVideo);

module.exports = Route;
