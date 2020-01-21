const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/feed.xml']);
let format = {language: 'sql', indent: ' '};

var feed = {
  f_No: 0,
  f_Name: 'f_Name',
  f_Manufacturer: 'f_Manufacturer',
  f_Calory: 'f_Calory',
  f_Species: 'f_Species'
};

router.get('/list', function (req, res) {
    let query = mybatisMapper.getStatement('feed', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('feeds: ', rows);
        res.json(rows);
    });
});

router.get('/get/:no', function(req, res){
    feed.f_No = req.params.no;
    let query = mybatisMapper.getStatement('feed', 'selectOne', feed, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('get feed: ', rows);
        res.json(rows);
    });
});

router.post('/add', function(req, res){
    feed = req.body;
    console.log(req.body);

    let query = mybatisMapper.getStatement('feed', 'addFeed', feed, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('add ok');
        res.send(rows);
    });
});

router.put('/update', function(req, res){
    feed = req.body;
    let query = mybatisMapper.getStatement('feed', 'updateFeed', feed, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('update ok');
        res.send(rows);
    });
});

router.delete('/delete/:no', function(req, res){
    feed.f_No = req.params.no;
    let query = mybatisMapper.getStatement('feed', 'deleteFeed', feed, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('delete ok');
        res.send(rows);
    });
});

module.exports = router;