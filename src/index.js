require('dotenv').config();
const express = require('express');

const app = express();

app.use('/',(req,res,next) => {
    res.send('Testing Rest Api Pertama');
});


app.listen(4000,() => {
  console.log(`Server berhasil berjalan di port 4000`);
});


