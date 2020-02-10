const express = require('express');
const cron = require('node-cron');
const app = express();
const port = 3000;
const Funcs = require('./routes/logupdate/logupdatecontroller.js');
const ngrok_info = require('./ngrok_info/ngrok_info.js');

app.use('/', require('./routes/index.js'));

cron.schedule('0,30 * * * *', function(){
    Funcs.selectAll();
    console.log("CRON ACCEPT");
});

ngrok_info.ngrok_info();

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});