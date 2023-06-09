require('dotenv').config();
const express = require('express');
const userTesting = require('./routes/user');
const app = express();
app.use(express.json());
app.use('/',userTesting);
app.listen(4000,() => { console.log(`Server berhasil berjalan di port 4000`); });

