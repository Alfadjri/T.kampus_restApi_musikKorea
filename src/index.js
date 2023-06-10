require('dotenv').config();
const express = require('express');
const accaptHader = require('./middelware/headerAccapt.js');
const TestingUser = require('./routes/user');
const importFile = require('./routes/import');
const grupController = require('./routes/grup');

const app = express();
app.use(express.json());
app.use(accaptHader);




app.use('/',TestingUser);
app.use('/grup',grupController);
app.use('/import/excel/',importFile);
app.listen(4000,() => { console.log(`Server berhasil berjalan di port 4000`); });

