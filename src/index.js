require('dotenv').config();
const PORT = process.env.host_port || 4000;
const express = require('express');

const app = express();

app.use('/',(req,res,next) => {
    res.send('Testing Rest Api Pertama');
});



app.listen(PORT,() => {
  console.log(`Server berhasil berjalan di port ${PORT}`);
});


