const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/setting.xml']);
let format = {language: 'sql', indent: ' '};

var setting = {
  s_No: 0,
  d_No: 0,
  s_Time: 's_Time',
  s_Amount: 's_Amount'
};

router.get('/list', function (req, res) {
    let query = mybatisMapper.getStatement('setting', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('settings: ', rows);
        res.json(rows);
    });
});

router.get('/get/:no', function(req, res){
    setting.s_No = req.params.no;
    let query = mybatisMapper.getStatement('setting', 'selectOne', setting, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('get setting: ', rows);
        res.json(rows);
    });
});

router.post('/add', function(req, res){
    setting = req.body;
    console.log(req.body);

    let query = mybatisMapper.getStatement('setting', 'addSetting', setting, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('add ok');
        res.send(rows);
    });
});

router.put('/update', function(req, res){
    setting = req.body;
    let query = mybatisMapper.getStatement('setting', 'updateSetting', setting, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('update ok');
        res.send(rows);
    });
});

router.delete('/delete/:no', function(req, res){
    setting.s_No = req.params.no;
    let query = mybatisMapper.getStatement('setting', 'deleteSetting', setting, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('delete ok');
        res.send(rows);
    });
});

module.exports = router;