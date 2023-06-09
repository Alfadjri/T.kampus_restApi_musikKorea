require('dotenv').config();
<<<<<<< HEAD
=======
const PORT = process.env.host_port || 4000;
>>>>>>> upstream/main
const express = require('express');

const app = express();

app.use('/',(req,res,next) => {
    res.send('Testing Rest Api Pertama');
});


<<<<<<< HEAD
app.listen(4000,() => {
  console.log(`Server berhasil berjalan di port 4000`);
=======

app.listen(PORT,() => {
  console.log(`Server berhasil berjalan di port ${PORT}`);
>>>>>>> upstream/main
});


