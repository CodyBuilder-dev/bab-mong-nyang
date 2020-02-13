const express = require('express');
const router = express.Router();

const controller = require('./feed.controller');

router.get('/', controller.selectAll);

router.get('/basic/:no', controller.basic);

router.get('/nutrient/:no', controller.nutrient);

router.post('/cal/num', controller.calNum);

router.post('/cal/direct', controller.calDirect);

module.exports = router;