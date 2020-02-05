const mysql = require('mysql');
const mybatisMapper = require('mybatis-mapper');
const mybatisMApper = require('mybatis-mapper');

var conn = require('../../config/backdb.js');
var deviceconn = require('../../config/database.js');
const backconn = mysql.createConnection(conn);
const dbconn = mysql.createConnection(deviceconn);

mybatisMapper.createMapper(['./mapper/sample.xml']);
mybatisMApper.createMapper(['./mapper/feeding.xml']);
let format = {language: 'sql', indent: ' '};

var datas = {
    _logtime : '000000000000',
    _isfeeded : 0
};


var LOG;
const selectAll = function (req, res) {
    let query = mybatisMApper.getStatement('feeded', 'selectAll', format);
    console.log(query);
    dbconn.query(query, function(err, rows) {
        if(err) throw err;
        console.log("read success");
        console.log(rows);
        if(res) res.json(rows);
        if(rows.length){
            updatevar(rows);
            insertvar(rows);
        }
    });
};

const logUpdate = function(req,res){
    // let query = mybatisMapper.getStatement('sample', 'logUpdate', format);
    // console.log(query);
    // backconn.query(query, function(err, rows) {
    //     if(err) throw err;
    //     console.log('Data Update!');
    //     res.json(rows);
    // });
}

module.exports = {
    selectAll: selectAll,
    logUpdate: logUpdate
};


async function updatevar(rows){
    try{   
        for(var i=0;i<rows.length; ++i){
          datas._logtime =  rows[i]._time;
           console.log(datas._logtime);
           datas._isfeeded =  rows[i]._amount;
           console.log(datas._isfeeded);
           let iquery = mybatisMapper.getStatement('sample', 'logUpdate', datas, format );
           backconn.query(iquery, function(err, vars){
               if(err) throw err;
               console.log("input success");
           })
       }
     }catch(error) {
        console.log(error);   
  }
}

async function insertvar(rows){
    try{
        var param=await{
            start : rows[0]._time,
            end : rows[rows.length-1]._time
        };
        let uquery = mybatisMApper.getStatement('feeded','updateflag',param,format);
        dbconn.query(uquery, function(err, vars){
            if(err) throw err;
            console.log("update success");
    })
    }catch(error) {
        console.log(error);
    }
}