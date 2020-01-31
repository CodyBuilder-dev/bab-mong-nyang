var express = require('express');
var router = express.Router();
//body-parser 필요한가? 모르겠는데 일단 주석처리
//var bodyParser = require('body-parser');
//GPIO 제어용 모듈
var Gpio = require('onoff').Gpio;
var bcm14 = new Gpio(14,'out');

var led ="off"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', led:led });
});

router.post('/',function(req,res,next){
  led = req.body.led;
  if (led == 'on'){
    bcm14.writeSync(1);
 }
  else {
    bcm14.writeSync(0);
  }
  res.render('index', { 
    title: 'Express', led:led });
  
})

module.exports = router;
