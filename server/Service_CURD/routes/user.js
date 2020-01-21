const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/user.xml']);
let format = {language: 'sql', indent: ' '};

var user = {
  u_No: 0,
  u_Id: 'u_Id',
  u_Pw: 'u_Pw',
  u_Name: 'u_Name',
  u_Email: 'u_Email'
};

router.get('/list', function (req, res) {
    let query = mybatisMapper.getStatement('user', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('Users: ', rows);
        res.json(rows);
    });
});

router.get('/get/:id', function(req, res){
    user.u_Id = req.params.id;
    let query = mybatisMapper.getStatement('user', 'selectOne', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('get user: ', rows);
        res.json(rows);
    });
});

router.post('/add', function(req, res){
    user = req.body;
    console.log(req.body);

    let query = mybatisMapper.getStatement('user', 'addUser', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('add ok');
        res.send(rows);
    });
});

router.put('/update', function(req, res){
    user = req.body;
    console.log(user);
    let query = mybatisMapper.getStatement('user', 'updateUser', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('update ok');
        res.send(rows);
    });
});

router.delete('/delete/:id', function(req, res){
    user.id = req.params.id;
    let query = mybatisMapper.getStatement('user', 'deleteUser', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('delete ok');
        res.send(rows);
    });
});

module.exports = router;