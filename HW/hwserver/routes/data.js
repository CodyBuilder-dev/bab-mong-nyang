const express= require('express');
const router= express.Router();

const controller= require('./datacontroller');

router.get('/',controller.selectAll);

module.exports=router;