const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/logdata.xml']);
let format = {language: 'sql', indent: ' '};

var logdata = {
  l_No: 0,
  d_No: 0,
  l_Time: 'l_Time',
  l_Reamain: 'l_Reamain'
};

router.get('/list', function (req, res) {
    let query = mybatisMapper.getStatement('logdata', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('logdatas: ', rows);
        res.json(rows);
    });
});

router.get('/get/:no', function(req, res){
    logdata.l_No = req.params.no;
    let query = mybatisMapper.getStatement('logdata', 'selectOne', logdata, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('get logdata: ', rows);
        res.json(rows);
    });
});

router.post('/add', function(req, res){
    logdata = req.body;
    console.log(req.body);

    let query = mybatisMapper.getStatement('logdata', 'addLogdata', logdata, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('add ok');
        res.send(rows);
    });
});

router.put('/update', function(req, res){
    logdata = req.body;
    let query = mybatisMapper.getStatement('logdata', 'updateLogdata', logdata, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('update ok');
        res.send(rows);
    });
});

router.delete('/delete/:no', function(req, res){
    logdata.l_No = req.params.no;
    let query = mybatisMapper.getStatement('logdata', 'deleteLogdata', logdata, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('delete ok');
        res.send(rows);
    });
});

module.exports = router;