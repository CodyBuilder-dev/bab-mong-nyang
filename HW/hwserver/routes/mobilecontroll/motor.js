const express = require('express');
const router = express.Router(); //router: express의 Router 인스턴스(=완전한 미들웨어, 라우팅 시스템, mini-app)

const controller = require('./motorcontroller');

// 데이터 호출
router.post('/', controller.immediatefeed);

module.exports = router;
