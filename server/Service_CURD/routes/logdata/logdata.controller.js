const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

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
    let query = mybatisMapper.getStatement('logdata', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('Logdata selectAll ok');
        res.json(rows);
    });
};

const selectOne = function (req, res) {
    logdata.l_No = req.params.no;
    let query = mybatisMapper.getStatement('logdata', 'selectOne', logdata, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('Logdata selectOne ok: ' + logdata.l_No);
        res.json(rows);
    });
};

const add = function (req, res) {
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
};

const update = function (req, res) {
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
};

const del = function (req, res) {
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
};

var bars = [];

const selectChart = function (req, res) {
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

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    add: add,
    update: update,
    del: del,
    selectChart: selectChart
};