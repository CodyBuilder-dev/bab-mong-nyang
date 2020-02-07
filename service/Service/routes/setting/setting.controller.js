const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/setting.xml']);
let format = {language: 'sql', indent: ' '};

var setting = {
    s_No: 0,
    d_No: 0,
    s_Time: 's_Time',
    s_Amount: 's_Amount',
    s_Activate: true
};

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        let query = mybatisMapper.getStatement('setting', 'selectAll', format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('Setting selectAll ok');
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        setting.d_No = req.params.no;
        let query = mybatisMapper.getStatement('setting', 'selectOne', setting, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('Setting selectOne ok: ' + setting.d_No);
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        setting = req.body;
        let check_query = mybatisMapper.getStatement('setting', 'settingCheck', setting, format);
        connection.query(check_query, function(check_err, check_rows){
            if(check_err) throw check_err;
            if(check_rows[0]){
                console.log('Setting add fail: ' + setting.s_Time);
                res.send(false);
            }
            else{
                if(addCheck(req.body)){
                    let query = mybatisMapper.getStatement('setting', 'addSetting', setting, format);
                    connection.query(query, function(err, rows) {
                        if(err) throw err;
                        console.log('Setting add ok: ' + setting.s_Time);
                        res.send(true);
                    });
                }
                else{
                    console.log('Setting add fail: Wrong Type');
                    res.send(false);
                }
            }
        });    
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const update = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        setting = req.body;
        let query = mybatisMapper.getStatement('setting', 'updateSetting', setting, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.changedRows>0){
                console.log('Setting update ok: ' + setting.s_No);
                res.send(true);
                update_hw(setting.d_No);
            }
            else{
                console.log('Setting update fail: ' + setting.s_No);
                res.send(false);
            }        
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        setting.s_No = req.params.no;
        let query = mybatisMapper.getStatement('setting', 'deleteSetting', setting, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.affectedRows>0){
                console.log('Setting delete ok: ' + setting.s_No);
                res.send(true);
            }
            else{
                console.log('Setting delete fail: ' + setting.s_No);
                res.send(false);
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const timeReg = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
const amountReg= /^[0-9]+$/;

function addCheck(body){
    if(!timeReg.test(body.s_Time)){
        console.log('Wrong Time');
        return false;
    }
    if(!amountReg.test(body.s_Amount)||body.s_Amount.length<1||body.s_Amount.length>4){
        console.log('Wrong Amount');
        return false;
    }
    return true;
}

function update_hw(no) { //setting 정보 수정 시 hw에 전송
    setting.d_No = no;
    let query = mybatisMapper.getStatement('setting', 'updateHW', setting, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;        
        console.log('Setting update_hw ok: ' + setting.d_No);
        const request = require('request');
        const res= request.post({
            headers: {'content-type': 'application/json'},                
            url: 'http://70.12.247.120:3000/timeset/update', 
            body: rows,
            json: true
            }, function(error, response, body){     
            console.log(body);
        });
        console.log("response success : " + {...res});      
        console.log("gogo hw");
        //console.log(rows);
    });
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
    del: del
};