const express = require('express');
const router = express.Router();

const controller = require('./feed.controller');

router.get('/', controller.selectAll);

router.get('/:no', controller.selectOne);

module.exports = router;