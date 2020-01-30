var express = require('express');
var router = express.Router();

var exec = require("child_process").exec; //for moter
var exec2 = require("child_process").exec; //for speaker

var fs = require('fs');

var rotation = 0;

router.post('/',function(req,res,next){
    if (req.body.motor == "on") {
        //C motor code on
        rotation = req.body.rotat;
        console.log("AWS send "+rotation);
        console.log('/home/pi/project/s02p12a103/HW/device/main_device '+rotation);
        exec('/home/pi/project/s02p12a103/HW/device/main_device '+rotation,
            function (err,stdout,stderr){
                if(err) console.error(err);
            });
        exec2('/home/pi/work/pi-mobile/src/mario',
        function (err,stdout,stderr){
            if(err) console.error(err);
        });
        
    }
})

module.exports = router;
