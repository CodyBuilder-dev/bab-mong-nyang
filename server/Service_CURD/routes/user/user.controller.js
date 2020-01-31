const mysql = require('mysql'); //mysql 사용
const dbconfig = require('../../config/database.js'); //dbconfig: 데이터베이스 접속 환경 설정
const connection = mysql.createConnection(dbconfig); //connection: mysql 연결

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper'); //mybatis-mapper 사용
mybatisMapper.createMapper(['./mapper/user.xml']); //createMapper: 작성된 Mapper Load
let format = {language: 'sql', indent: ' '};

var user = {
    u_No: 0,
    u_Id: 'u_Id',
    u_Pw: 'u_Pw',
    u_Name: 'u_Name',
    u_Email: 'u_Email'
};

const selectAll = function (req, res) {
    //getStatement('Namespace 이름', 'Sql ID', 'Prameters', 'format')
    let query = mybatisMapper.getStatement('user', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('User selectAll ok');
        res.json(rows);
    });
};

const selectOne = function (req, res) {
    user.u_No = req.params.no;
    let query = mybatisMapper.getStatement('user', 'selectOne', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('User selectOne ok: ' + user.u_No);
        res.json(rows[0]);
    });
};

const idCheck = function (req, res) {
    user.u_Id = req.params.id;
    let query = mybatisMapper.getStatement('user', 'idCheck', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        if(rows[0]){
            console.log('User idCheck fail: ' + user.u_Id);
            res.send(false);            
        }
        else{
            console.log('User idCheck ok: ' + user.u_Id);
            res.send(true);
        }        
    });
};

const add = function (req, res) {
    user = req.body;
    if(addCheck(req.body)){
        let query = mybatisMapper.getStatement('user', 'addUser', user, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('User add ok: ' + user.u_Id);
            res.send(true);
        });
    }
    else{
        console.log('User add fail: ' + req.body.u_Id);
        res.send(false);
    }    
};

const login = function (req, res) {
    user = req.body;
    let query = mybatisMapper.getStatement('user', 'loginUser', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        if(rows[0]){
            console.log('User login ok: ' + user.u_Id);
            res.send(rows[0]);            
        }
        else{
            console.log('User login fail: ' + user.u_Id);
            res.send(false);
        }       
    });
};

const update = function (req, res) {
    user = req.body;
    if(updateCheck(req.body)){
        let query = mybatisMapper.getStatement('user', 'updateUser', user, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            
            if(rows.changedRows>0) {
                console.log('User update ok: ' + user.u_Id);
                res.send(true);
            }
            else{
                console.log('User update fail: ' + user.u_Id);
                res.send(false);
            }
        });
    }
    else{
        console.log('User update fail: ' + req.body.u_Id);
        res.send(false);
    }    
};

const del = function (req, res) {
    user.u_No = req.params.no;
    let query = mybatisMapper.getStatement('user', 'deleteUser', user, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        if(rows.affectedRows>0){
            console.log('User delete ok: ' + user.u_No);
            res.send(true);
        }
        else{
            console.log('User delete fail: ' + user.u_No);
            res.send(false);
        }
    });
};

const idReg = /^[a-z]+[a-z0-9]{4,14}$/;
const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
const nameReg = /^[가-힣]{2,4}|[a-zA-Z]{2,15}$/;
const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

function addCheck(body){
    if(!idReg.test(body.u_Id)) {
        console.log('Wrong Id: ' + body.u_Id);
        return false;
    }
    if(!updateCheck(body)){
        return false;
    }
    return true;
}

function updateCheck(body){
    if(!pwReg.test(body.u_Pw)){
        console.log('Wrong Pw: ' + body.u_Pw);
        return false;
    }
    if(!nameReg.test(body.u_Name)){
        console.log('Wrong Name: ' + body.u_Name);
        return false;
    }
    if(!emailReg.test(body.u_Email)){
        console.log('Wrong Email: ' + body.u_Email);
        return false;
    }
    return true;
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    idCheck: idCheck,
    add: add,
    login: login,
    update: update,
    del: del    
};