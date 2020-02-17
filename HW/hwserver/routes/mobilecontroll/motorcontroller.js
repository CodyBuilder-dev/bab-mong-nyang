const exec = require("child_process").exec; //for motor
const fs = require('fs');
const Funcs = require('../logupdate/logupdatecontroller.js');

const immediatefeed = async function(req,res,next){
    if (req.body.motor == "on") {
        //C motor code on
        var feedingamount=req.body.rotat;
        var rotation = feedingamount/50;
        console.log("AWS send "+rotation);
        var executecommand = '/home/pi/project/s02p12a103/HW/device/refactoring/main_device '+rotation;
        await exec(executecommand, function (err,stdout,stderr){
                if(err) throw err;
                res.json(feedingamount + "feeded");
        });
        await Funcs.selectAll();
        console.log("Feeding ACCEPT");
    };
}

module.exports={
    immediatefeed : immediatefeed
}