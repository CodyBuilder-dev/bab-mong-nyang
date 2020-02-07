const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/review.xml']);
let format = {language: 'sql', indent: ' '};

var review = {
    f_No: 0,
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
        review.f_No = req.params.no;
        let query = mybatisMapper.getStatement('review', 'selectAll', review, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('review selectAll ok: ' + review.u_No);
            res.json(rows);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        review.d_No = req.params.no;
        let query = mybatisMapper.getStatement('review', 'selectOne', review, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('review selectOne ok: ' + review.d_No);
            res.json(rows[0]);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        console.log(req.headers);
        review = req.body;
        let check_query = mybatisMapper.getStatement('review', 'reviewCheck', review, format);
        connection.query(check_query, function(check_err, check_rows){
            if(check_err) throw check_err;
            if(check_rows[0]){
                console.log('review add fail: ' + review.d_Name);
                res.send(false);
            }
            else{
                let query = mybatisMapper.getStatement('review', 'addreview', review, format);
                connection.query(query, function(err, rows){
                    if(err) throw err;
                    if(change_Last()==false) {
                        console.log('review add fail: ' + review.d_Name);
                        res.send(false);
                    }
                    else{
                        console.log('review add ok: ' + review.d_Name);
                        res.send(true);
                    }
                });            
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

function change_Last() {
    let get_query = mybatisMapper.getStatement('review', 'getreview', review, format);
    connection.query(get_query, function(get_err, get_rows){
        if(get_err) throw get_err;
        if(get_rows[0]){
            review.d_No = get_rows[0].d_No;
            let change_query = mybatisMapper.getStatement('review', 'changeLast', review, format);
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
        review = req.body;
        console.log(req.body);
        let query = mybatisMapper.getStatement('review', 'updatereview', review, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.changedRows>0){
                console.log('review update ok: ' + review.d_No);
                res.send(true);
            }
            else{
                console.log('review update fail: ' + review.d_No);
                res.send(false);
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        review.d_No = req.params.no;
        let query = mybatisMapper.getStatement('review', 'deletereview', review, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.affectedRows>0){
                console.log('review delete ok: ' + review.d_No);
                if(delete_Last()==false){
                    res.send(false);
                }
                else{
                    res.send(true);
                }
            }
            else{
                console.log('review delete fail: ' + review.d_No);
                res.send(false);
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

function delete_Last() {
    let del_query = mybatisMapper.getStatement('review', 'deleteLast', review, format);
    connection.query(del_query, function(err, rows){
        if(err) throw err;
        console.log(rows);
        if(rows.changedRows>0) {
            return true;
        }
        else{
            let zero_query = mybatisMapper.getStatement('review', 'zeroLast', review, format);
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