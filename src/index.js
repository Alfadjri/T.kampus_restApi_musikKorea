require('dotenv').config();
const express = require('express');
const TestingUser = require('./routes/user');
const importFile = require('./routes/import');
const app = express();
app.use(express.json());
app.use('/',TestingUser);
app.use('/import',importFile);
app.listen(4000,() => { console.log(`Server berhasil berjalan di port 4000`); });

