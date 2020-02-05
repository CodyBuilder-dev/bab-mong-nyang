const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

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

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        device.u_No = req.params.no;
        let query = mybatisMapper.getStatement('device', 'selectAll', device, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('device selectAll ok: ' + device.u_No);
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        device.d_No = req.params.no;
        let query = mybatisMapper.getStatement('device', 'selectOne', device, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('device selectOne ok: ' + device.d_No);
            res.json(rows[0]);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        console.log(req.headers);
        device = req.body;
        let check_query = mybatisMapper.getStatement('device', 'deviceCheck', device, format);
        connection.query(check_query, function(check_err, check_rows){
            if(check_err) throw check_err;
            if(check_rows[0]){
                console.log('Device add fail: ' + device.d_Name);
                res.send(false);
            }
            else{
                let query = mybatisMapper.getStatement('device', 'addDevice', device, format);
                connection.query(query, function(err, rows){
                    if(err) throw err;
                    if(change_Last()==false) {
                        console.log('Device add fail: ' + device.d_Name);
                        res.send(false);
                    }
                    else{
                        console.log('Device add ok: ' + device.d_Name);
                        res.send(true);
                    }
                });            
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

function change_Last() {
    let get_query = mybatisMapper.getStatement('device', 'getDevice', device, format);
    connection.query(get_query, function(get_err, get_rows){
        if(get_err) throw get_err;
        if(get_rows[0]){
            device.d_No = get_rows[0].d_No;
            let change_query = mybatisMapper.getStatement('device', 'changeLast', device, format);
            connection.query(change_query, function(change_err, change_rows){
                if(change_err) throw change_err;
                console.log(change_rows);
                if(change_rows.changedRows>0) {
                    return true;
                }
                else return false;
            });
        }
        else return false;
    });
}

const update = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        device = req.body;
        console.log(req.body);
        let query = mybatisMapper.getStatement('device', 'updateDevice', device, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.changedRows>0){
                console.log('device update ok: ' + device.d_No);
                res.send(true);
            }
            else{
                console.log('device update fail: ' + device.d_No);
                res.send(false);
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        device.d_No = req.params.no;
        let query = mybatisMapper.getStatement('device', 'deleteDevice', device, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.affectedRows>0){
                console.log('device delete ok: ' + device.d_No);
                if(delete_Last()==false){
                    res.send(false);
                }
                else{
                    res.send(true);
                }
            }
            else{
                console.log('device delete fail: ' + device.d_No);
                res.send(false);
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

function delete_Last() {
    let del_query = mybatisMapper.getStatement('device', 'deleteLast', device, format);
    connection.query(del_query, function(err, rows){
        if(err) throw err;
        console.log(rows);
        if(rows.changedRows>0) {
            return true;
        }
        else{
            let zero_query = mybatisMapper.getStatement('device', 'zeroLast', device, format);
            connection.query(zero_query, function(zero_err, zero_rows){
                if(zero_err) throw zero_err;
                if(zero_rows.changedRows>0) return true;
                else return false;
            });
        }
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