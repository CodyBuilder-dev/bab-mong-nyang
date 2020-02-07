const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/feed.xml']);
let format = {language: 'sql', indent: ' '};

var feed = {
    f_No: 0,
    f_Name: 'f_Name',
    f_Species: 'f_Species',
    f_Manufacturer: 'f_Manufacturer',
    f_Protein: 11.11,
    f_Fat: 11.11,
    f_Calcium: 11.11,
    f_Phosphorus: 11.11,
    f_Fiber: 11.11,
    f_Ash: 11.11,
    f_Moisture: 11.11
};

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        let query = mybatisMapper.getStatement('feed', 'selectAll', format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log(rows);
            console.log('Feed selectAll ok');
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        feed.f_No = req.params.no;
        let query = mybatisMapper.getStatement('feed', 'selectOne', feed, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('Feed selectOne ok: ' + feed.f_No);
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
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
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const update = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
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
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
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
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

function checkToken(token) {
    var temp2 = false;
    jwt.verify(token, secretKey.secret, (err, decoded) => {
        if(err) {
            console.log('토큰 에러 발생!');
            console.log(err);
            temp2 = false;
        }
        else {
            if(decoded) {
                console.log('유효한 토큰입니다!');
                temp2 = true;
            }
            else{
                console.log('권한이 없습니다!');
                temp2 = false;
            }
        }
    });
    return temp2;
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    add: add,
    update: update,
    del: del
};