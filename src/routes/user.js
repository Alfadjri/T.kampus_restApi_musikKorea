const express = require('express');
const UserController = require('../controllers/userController');

const Route = express.Router();

Route.get('/',UserController.getAll);


module.exports = Route;
