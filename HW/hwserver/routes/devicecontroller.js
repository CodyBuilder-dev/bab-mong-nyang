const mariadb = require('mariadb');
const mybatismapper = require('mybatis-mapper');

const connection = mariadb.createConnection('../config/database.js');
mybatismapper.createMapper(['../mapper/feeding.xml']);
let format = {language: 'sql', indent: ' '};

var exec = require('child_process').exec;

module.exports.setcron = function(req,res){
            for(var i = 0; i< req.length; ++i){
                var obj= req[i];

                var _hour = obj.time.getHours();
                var _min = obj.time.getMinutes();
                var _amount = obj.amount/15;
                var template = `sudo echo "${_min} ${_hour} * * * /home/pi/project/s02p12a103/HW/device/device ${_amount}" >>/home/pi/tmpcron/pi`

                exec(template,function(error,stdout, stderr){
                    if(error!==null){
                        console.log('input error:'+error);
                    }
                    else{
                        exec('chmod 0600 /home/pi/tmpcron/pi')
                        exec('sudo mv /home/pi/tmpcron/pi /var/spool/cron/crontabs/');
                        exec('sudo service cron restart');
                        res.json("SERVICE CHANGE SUCCESS!");
                    }
                });
            }
        }
