const express = require('express');
const cron = require('node-cron');
const app = express();
const port = 3000;
const Funcs = require('./routes/sample/samplecontroller.js');

app.use('/', require('./routes/index.js'));

cron.schedule('* * * * *', function(){
    console.log(1);
    Funcs.selectAll();
    console.log(2);
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});