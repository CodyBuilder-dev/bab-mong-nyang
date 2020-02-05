const express = require('express');
const router = express.Router(); //router: express의 Router 인스턴스(=완전한 미들웨어, 라우팅 시스템, mini-app)

const controller = require('./samplecontroller');

//전체 User 데이터 호출
router.get('/', controller.selectAll);
//router.post('/update', controller.logUpdate);

module.exports = router;
