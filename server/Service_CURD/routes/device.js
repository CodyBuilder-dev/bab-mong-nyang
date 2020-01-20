const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/device.xml']);
let format = {language: 'sql', indent: ' '};

var device = {
  d_No: 0,
  u_No: 0,
  SerialNo: 'SerialNo',
  d_Name: 'd_Name',
  d_Age: 'd_Age',
  d_Species: 'd_Species',
  d_Weight: 'd_Weight'
};

router.get('/list', function (req, res) {
    let query = mybatisMapper.getStatement('device', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('devices: ', rows);
        res.json(rows);
    });
});

router.get('/get/:no', function(req, res){
    device.d_No = req.params.no;
    let query = mybatisMapper.getStatement('device', 'selectOne', device, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('get device: ', rows);
        res.json(rows);
    });
});

router.post('/add', function(req, res){
    device = req.body;
    console.log(req.body);

    let query = mybatisMapper.getStatement('device', 'addDevice', device, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('add ok');
        res.send(rows);
    });
});

router.put('/update', function(req, res){
    device = req.body;
    let query = mybatisMapper.getStatement('device', 'updateDevice', device, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('update ok');
        res.send(rows);
    });
});

router.delete('/delete/:no', function(req, res){
    device.d_No = req.params.no;
    let query = mybatisMapper.getStatement('device', 'deleteDevice', device, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('delete ok');
        res.send(rows);
    });
});

module.exports = router;