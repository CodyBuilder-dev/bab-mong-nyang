const express = require('express');
const router = express.Router();

const controller = require('./feed.controller');

router.get('/', controller.selectAll);

router.get('/:no', controller.selectOne);

router.post('/', controller.add);

router.put('/:no', controller.update);

router.delete('/:no', controller.del);

module.exports = router;