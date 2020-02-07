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
    d_Name: 'd_Name',
    d_Age: 'd_Age',
    d_Species: 'd_Species',
    d_Weight: 'd_Weight',
    SerialNo: 'SerialNo',
    UUID: 'UUID'
};

var err_result = {
    IsError: true,
    Message: 'msg'
}

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        device.u_No = req.params.no;
        let query = mybatisMapper.getStatement('device', 'selectAll', device, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '해당 유저의 전체 Device 데이터를 불러오는 데 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            console.log('device selectAll ok: ' + device.u_No);
            console.log(rows);
            res.json(rows);
        });
    }
    else{
        console.log('device selectAll fail: ' + device.u_No);
        res.json(err_result);
    }
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        device.d_No = req.params.no;
        let query = mybatisMapper.getStatement('device', 'selectOne', device, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '해당 Device 데이터를 불러오는 데 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            console.log('device selectOne ok: ' + device.d_No);
            res.json(rows[0]);
        });
    }
    else {        
        console.log('device selectOne fail: ' + device.d_No);
        res.json(err_result);        
    }
};

const checkSerial = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        device.SerialNo = req.params.no;
        let query = mybatisMapper.getStatement('device', 'checkSerial', device, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '해당 시리얼 번호를 확인 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            if(rows[0]){
                device.UUID = rows[0].UUID;
                console.log('device checkSerial ok: ' + device.SerialNo);
                res.send(true);
            }
            else{
                console.log('device checkSerial fail: ' + device.SerialNo);
                res.send(false);
            }
        });
    }
    else {        
        console.log('device checkSerial fail: ' + device.SerialNo);
        res.json(err_result);        
    }
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)) {        
        device = {...device , ...req.body};
        let check_query = mybatisMapper.getStatement('device', 'deviceCheck', device, format);
        connection.query(check_query, function(check_err, check_rows){
            if(check_err) {
                console.log(check_err);
                err_result.Message = '해당 기기 등록 여부를 확인하던 중 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            if(check_rows[0]){
                console.log('Device add fail: ' + device.d_Name);
                res.send(false);
            }
            else{
                let query = mybatisMapper.getStatement('device', 'addDevice', device, format);
                connection.query(query, function(err, rows){
                    if(err) {
                        console.log(err);
                        err_result.Message = '기기를 등록하던 중 오류가 발생하였습니다';
                        res.json(err_result);
                        return;
                    }
                    let get_query = mybatisMapper.getStatement('device', 'getDevice', device, format);
                    connection.query(get_query, function(get_err, get_rows){
                        if(get_err) {
                            console.log(get_err);
                            err_result.Message = '기기를 등록 후 기기 번호를 가져오던 중 오류가 발생하였습니다';
                            res.json(err_result);
                            return;
                        }
                        if(get_rows[0]){
                            device.d_No = get_rows[0].d_No;
                            let change_query = mybatisMapper.getStatement('device', 'changeLast', device, format);
                            connection.query(change_query, function(change_err, change_rows){
                                if(change_err) {
                                    console.log(change_err);
                                    err_result.Message = '유저의 최신 기기 번호를 갱신하던 중 오류가 발생하였습니다';
                                    res.json(err_result);
                                    return;
                                }
                                if(change_rows.changedRows>0) {
                                    console.log('Device add ok: ' + device.d_Name);
                                    res.json(device.d_No);
                                }
                                else {
                                    console.log('Device add fail: ' + device.d_Name);
                                    res.send(false);
                                }
                            });
                        }                        
                        else {
                            console.log('Device add fail: ' + device.d_Name);
                            res.send(false);
                        }
                    });
                });            
            }
        });               
    }
    else {        
        console.log('device add fail: ' + device.d_Name);
        res.json(err_result);        
    }
};

const update = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        device = {...device , ...req.body};
        console.log(req.body);
        let query = mybatisMapper.getStatement('device', 'updateDevice', device, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '기기 정보를 수정하던 중 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
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
    else {        
        console.log('device update fail: ' + device.d_No);
        res.json(err_result);        
    }
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        device.d_No = req.params.no;
        let query = mybatisMapper.getStatement('device', 'deleteDevice', device, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '기기 정보를 삭제하던 중 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            if(rows.affectedRows>0){
                console.log('device delete ok: ' + device.d_No);
                let del_query = mybatisMapper.getStatement('device', 'deleteLast', device, format);
                connection.query(del_query, function(del_err, del_rows){
                    if(del_err) {
                        console.log(del_err);
                        err_result.Message = '유저의 최신 기기 번호를 삭제하던 중 오류가 발생하였습니다';
                        res.json(err_result);
                        return;
                    }
                    if(del_rows.changedRows>0) {
                        let get_query = mybatisMapper.getStatement('device', 'getLast', device, format);
                        connection.query(get_query, function(get_err, get_rows){
                            if(get_err) {
                                console.log(get_err);
                                err_result.Message = '유저의 최신 기기 번호를 갱신하던 중 오류가 발생하였습니다';
                                res.json(err_result);
                                return;
                            }
                            res.send(get_rows[0]);
                        });
                    }
                    else{
                        let zero_query = mybatisMapper.getStatement('device', 'zeroLast', device, format);
                        connection.query(zero_query, function(zero_err, zero_rows){
                            if(zero_err) {
                                console.log(zero_err);
                                err_result.Message = '유저의 최신 기기 번호를 갱신하던 중 오류가 발생하였습니다';
                                res.json(err_result);
                                return;
                            }
                            res.send(0);
                        });
                    }
                });
            }
            else{
                console.log('device delete fail: ' + device.d_No);
                res.send(false);
            }
        });
    }
    else {        
        console.log('device delete fail: ' + device.d_No);
        res.json(err_result);        
    }
};

function checkToken(token) {
    var tempToken = false;
    jwt.verify(token, secretKey.secret, (err, decoded) => {
        if(err) {
            console.log('토큰 에러 발생!');
            console.log(err);
            err_result.Message = '토큰 에러 발생! 로그인을 다시 해주세요';
            tempToken = false;
        }
        else {
            if(decoded) {
                console.log('유효한 토큰입니다!');                
                tempToken = true;
            }
            else{
                console.log('권한이 없습니다!');
                err_result.Message = '토큰 권한이 만료되었습니다! 로그인을 다시 해주세요';
                tempToken = false;
            }
        }
    });
    return tempToken;
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    add: add,
    update: update,
    del: del,
    checkSerial: checkSerial
};