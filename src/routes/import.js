const express = require('express');
const multer = require('multer');
const upload = multer();
const importFile = require('../controllers/imports/importController');

const route = express.Router();

route.post('/excel',upload.single('file'),importFile.ImportExcel);


module.exports = route;


