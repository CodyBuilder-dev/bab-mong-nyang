const express = require('express');
const app = express();
const port = 3000;

//서버 시작
app.listen(port, () => console.log('Express server has started on port 3000'));

//CORS 처리
const CORS = require('cors')();
app.use(CORS);

//입력 Data을 json 형식으로 변환
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//router  사용
app.get('/', (req, res) => res.send('Hello Service_CURD!!!!'));

app.use('/user', require('./routes/user'));
app.use('/device', require('./routes/device'));
app.use('/setting', require('./routes/setting'));
app.use('/logdata', require('./routes/logdata'));
app.use('/feed', require('./routes/feed'));



module.exports = app;