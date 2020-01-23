const express= require('express');
const router= express.Router();

const controller= require('./datacontroller');
const device = require('./devicecontroller');

router.get('/data',controller.selectAll);

router.post('/device', device.setcron);

module.exports=router;