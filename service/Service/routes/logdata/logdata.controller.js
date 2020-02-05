const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/logdata.xml']);
let format = {language: 'sql', indent: ' '};

var logdata = {
    l_No: 0,
    d_No: 0,
    l_Time: 'l_Time',
    l_Remain: 'l_Remain'
};

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        let query = mybatisMapper.getStatement('logdata', 'selectAll', format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('Logdata selectAll ok');
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        logdata.l_No = req.params.no;
        let query = mybatisMapper.getStatement('logdata', 'selectOne', logdata, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('Logdata selectOne ok: ' + logdata.l_No);
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        logdata = req.body;
        let query = mybatisMapper.getStatement('logdata', 'addLogdata', logdata, format);
        connection.query(query, function(err, rows) {
            if(err) {
                res.send(false);
                throw err;
            }
            console.log('Logdata add ok');
            res.send(true);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const update = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        logdata = req.body;
        let query = mybatisMapper.getStatement('logdata', 'updateLogdata', logdata, format);
        connection.query(query, function(err, rows) {
            if(err) {
                res.send(false);
                throw err;
            }
            console.log('Logdata update ok');
            res.send(true);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        logdata.l_No = req.params.no;
        let query = mybatisMapper.getStatement('logdata', 'deleteLogdata', logdata, format);
        connection.query(query, function(err, rows) {
            if(err) {
                res.send(false);
                throw err;
            }
            console.log('Logdata delete ok');
            res.send(true);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

var bars = [];

const selectChart = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        let temp = {
            d_No: 0
        }
        temp.d_No = req.params.no;
        let query = mybatisMapper.getStatement('logdata', 'selectChart', temp, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(!rows[0]){
                console.log("selectChart fail");
                res.send(false);
            }
            else{
                for(var i = 0; i<rows.length; i++){
                    var bars_type = {
                        label : '00-00',
                        items : [
                            {
                                value: 0
                            }
                        ]
                    }
                    bars_type.label = rows[i].l_Time2;
                    bars_type.items[0].value = rows[i].l_Remain;
                    bars.push(bars_type);
                }
                res.send(bars);
                bars = [];
            }        
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
}

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
    del: del,
    selectChart: selectChart
};