var express = require('express');
var router = express.Router();
//body-parser 필요한가? 모르겠는데 일단 주석처리
//var bodyParser = require('body-parser');
var request = require('request');

//GPIO 제어용 모듈
var Gpio = require('onoff').Gpio;
//var Gpio_pwm = require('pigpio').Gpio;
var bcm14 = new Gpio(14,'out');
//var bcm12 = new Gpio_pwm(12,{mode:Gpio.OUTPUT});

let dutyCycle=  0;

var led ="off";
var num = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', led:led, num:num});
});

router.post('/',function(req,res,next){
  led = req.body.led;
  if (led == 'on'){
    //bcm14.writeSync(1);
 }
  else {
    //bcm14.writeSync(0);
  }

  if (req.body.op =="plus"){
    num++;
    console.log("now num is ",num)
    request.post(
      'http://52.78.235.226:3000',
      {form:{num:num}},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          console.log("num sent well");
       }
      }
    )
  }
  else if (req.body.op == "minus") {
    num--;
    console.log("now num is ",num)
    request.post(
      'http://52.78.235.226:3000',
      {form:{num:num}},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          console.log("num sent well");
       }
      }
    )
  }

  switch(req.body.sound) {
    case 'C5' :
      //bcm12.pwmFrequency(500);
      //bcm12.pwmWrite(50);
      break;
    case 'D5' :
      //bcm12.hardwarePwmWrite(587,50);
      break;
    case 'E5' :
      //bcm12.hardwarePwmWrite(659,50);
      break;
    case 'F5' :
      //bcm12.hardwarePwmWrite(698,50);
      break;
    case 'G5' :
      //bcm12.hardwarePwmWrite(783,50);
      break;
    case 'A5' :
      //bcm12.hardwarePwmWrite(880,50);
      break;
    case 'B5' :
      //bcm12.hardwarePwmWrite(1046,50);
      break;
    case 'C6' :
      //bcm12.hardwarePwmWrite(523,50);
      break;
    
                    
  }
  
  res.render('index', { 
    title: 'Express', led:led , num : num});
  
})

module.exports = router;
