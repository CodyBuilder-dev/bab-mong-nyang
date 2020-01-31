const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
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

const selectAll = function (req, res) {
    let query = mybatisMapper.getStatement('feed', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('Feed selectAll ok');
        res.json(rows);
    });
};

const selectOne = function (req, res) {
    feed.f_No = req.params.no;
    let query = mybatisMapper.getStatement('feed', 'selectOne', feed, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('Feed selectOne ok: ' + feed.f_No);
        res.json(rows);
    });
};

const add = function (req, res) {
    feed = req.body;
    let query = mybatisMapper.getStatement('feed', 'addFeed', feed, format);
    connection.query(query, function(err, rows) {
        if(err) {
            res.send(false);
            throw err;
        }
        console.log('Feed add ok');
        res.send(true);
    });
};

const update = function (req, res) {
    feed = req.body;
    let query = mybatisMapper.getStatement('feed', 'updateFeed', feed, format);
    connection.query(query, function(err, rows) {
        if(err) {
            res.send(false);
            throw err;
        }
        console.log('Feed update ok');
        res.send(true);
    });
};

const del = function (req, res) {
    feed.f_No = req.params.no;
    let query = mybatisMapper.getStatement('feed', 'deleteFeed', feed, format);
    connection.query(query, function(err, rows) {
        if(err) {
            res.send(false);
            throw err;
        }
        console.log('Feed delete ok');
        res.send(true);
    });
};

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    add: add,
    update: update,
    del: del
};