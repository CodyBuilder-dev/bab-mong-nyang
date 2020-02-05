var express = require('express');
var router = express.Router();

var led = "off"
var body = ""

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('post-test', { 
  led:led });
});

router.post('/',function(req,res,next){
    led = req.body.led;

    res.render('post-test', {
        body:req.body, led:led });
})
module.exports = router;
