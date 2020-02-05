const express = require('express');
const router = express.Router();

const controller = require('./logdata.controller');

router.get('/', controller.selectAll);

router.get('/:no', controller.selectOne);

router.post('/', controller.add);

router.put('/:no', controller.update);

router.delete('/:no', controller.del);

//d_No에 맞는 데이터들 중 날짜, 섭취량
router.get('/chart/:no', controller.selectChart);

module.exports = router;