const express = require('express');
const multer = require('multer');
const upload = multer();
const {ImportExcel} = require('../controllers/imports/importController');

const route = express.Router();

route.post('/artis',upload.single('file'),ImportExcel('artis'));
route.post('/grup',upload.single('file'),ImportExcel('grup'));

module.exports = route;


