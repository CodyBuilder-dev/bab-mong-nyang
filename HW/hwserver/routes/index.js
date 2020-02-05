const express= require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/sample', require('./sample/sample.js'));

module.exports=app;
