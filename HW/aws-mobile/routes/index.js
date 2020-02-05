var express = require('express');
var router = express.Router();
var request = require('request');

var led = "off";
var num = 0;
var rotation =0;
var motor = "off";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express', led:led, num:num});
});

router.post('/',function(req,res,next){
  
  //led on-off signal

  //led = req.body.input;
  // request.post(
  // 'http://961e3a2a.ngrok.io',
  // //'http://70.12.247.120:3000',
  // {form:{led:led}},
  // function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //       console.log("good");
  //   }
  // }
  // );
  
 
  //motor rotation signal
  rotation = req.body.rotat;
  motor = req.body.motor;
  if(motor == "on") { //모터제어 신호 전달
    console.log("from front, got " + rotation);
    console.log("motor = "+motor);

    request.post(
      'http://b124b9fc.ngrok.io/motor',
      {form:{ rotat:rotation, motor:motor}},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          console.log("pi got"+ body);
      }
    }
    )
  }
  

  res.render('index', { 
    title: 'Express', led:led,num:num });
  
})
module.exports = router;
