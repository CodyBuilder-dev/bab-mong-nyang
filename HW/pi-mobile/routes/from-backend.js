//BE에서 타임테이블 데이터가 들어올 경우, DB update하는 코드

// router require
var express = require('express');
var router = express.Router();

// 석호형 코드 베끼기

// mariadb require
const mysql = require('mysql');
const mybatisMapper = require('mybatis-mapper');

var conn = require('../config/pidb.js');
const backconn = mysql.createConnection(conn); 

mybatisMapper.createMapper(['./mapper/download-timetable.xml']);
let format = {language: 'sql', indent: ' '};




const truncAll = function (req, res) {
    let query = mybatisMapper.getStatement('timetable', 'truncAll', format);
    console.log(query);
    backconn.query(query, function(err, rows) {
        if(err) throw err;
        console.log('truncAll');
        res.json(rows);
    });
};

const logUpdate = function(req,res){
    let query = mybatisMapper.getStatement('sample', 'logUpdate', format);
    console.log(query);
    backconn.query(query, function(err, rows) {
        if(err) throw err;
        console.log('Data Update!');
        res.json(rows);
    });
}



//post로 들어오는 것으로 가정하고, 처리
router.post('/',function(req,res,next){
    var body = req.body;
    var query1 = mybatisMapper.getStatement('sample_timetable', 'truncAll', format);
    backconn.query(query1,function(err,rows){
        if(err) throw err;
        console.log('Data Truncated!');
    })
    for (var i = 0 ; i<body.length; ++i) {
        console.log(body[i].s_Time,body[i].s_Amount);
        var query2 = mybatisMapper.getStatement('sample_timetable','insertValue',{
            time : body[i].s_Time,
            amount : body[i].s_Amount},
            format);
        backconn.query(query2,function(err,rows){
            if(err) throw err;
            console.log('Data Inserted!');
        })
    }
    
})



// export
module.exports = {
    truncAll: truncAll,
    logUpdate: logUpdate
};


module.exports = router;

