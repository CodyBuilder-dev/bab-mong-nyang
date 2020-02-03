//BE에서 요청이 들어올 경우 Pi DB의 데이터를 보내주는 코드

// router require
var express = require('express');
var router = express.Router();
var request = require('request');

// mariadb require
const mysql = require('mysql');
const mybatisMapper = require('mybatis-mapper');

var conn = require('../config/pidb.js');
const backconn = mysql.createConnection(conn); 

mybatisMapper.createMapper(['./mapper/upload-log.xml']);

var data_json;
var params ={
    smallest: 0,
    biggest: 0,
};
let format = {language: 'sql', indent: ' '};

router.post('/',function(req,res,next){
    console.log(req.body);
    console.log(req.body.signal);
    
    if(req.body.signal == '1'){
        var query1 = mybatisMapper.getStatement('sample_log', 'send', format);
        
        backconn.query(query1,function(err,rows){
            if(err) throw err;
            console.log(rows);
            data_json = rows;
            request.post('http://70.12.246.68:3000/join/test',
                {form:{data:data_json}},
                function(error,response,body){
                    if (!error && response.statusCode == 200) {
                    console.log("num sent well");
                }});
            console.log('Data send!');

            params.smallest = rows[0]._time;
            params.biggest = rows[rows.length-1]._time;
            var query2 = mybatisMapper.getStatement('sample_log', 'sent', params,format);
            backconn.query(query2,function(err,rows){
                if(err) throw err;
                console.log('Data Updated!');
            });
    
        })

    }

    
    
})



module.exports = router;

