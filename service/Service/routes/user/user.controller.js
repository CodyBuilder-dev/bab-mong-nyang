const mysql = require('mysql'); //mysql 사용
const dbconfig = require('../../config/database.js'); //dbconfig: 데이터베이스 접속 환경 설정
const connection = mysql.createConnection(dbconfig); //connection: mysql 연결

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

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

//전체 User 데이터 호출(비동기)
const selectAll = function (req, res) {
    //getStatement('Namespace 이름', 'Sql ID', 'Prameters', 'format')
    let query = mybatisMapper.getStatement('user', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        console.log('User selectAll ok');
        res.json(rows);
    });    
};

//U_No에 맞는 데이터 호출(동기)
const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {        
        user.u_No = req.params.no;
        let query = mybatisMapper.getStatement('user', 'selectOne', user, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            console.log('User selectOne ok: ' + user.u_No);
            res.json(rows[0]);
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

//id 중복 확인
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

//회원가입
const add = function (req, res) {
    user = req.body;
    if(addCheck(req.body)){
        let query = mybatisMapper.getStatement('user', 'addUser', user, format);
        connection.query(query, function(err, rows) {
            console.log(err);
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

//로그인
const login = function (req, res) {
    user = req.body;
    let query = mybatisMapper.getStatement('user', 'loginUser', user, format);
    connection.query(query, function(err, rows) {
        console.log('hi');
        console.log(err);
        if(err) throw err;
        if(rows[0]){
            console.log('User login ok: ' + user.u_Id);
            var payload = {
                u_Id: user.u_Id
            };
            var options = {expiresIn: '1m'};
            jwt.sign(payload, secretKey.secret, options, function(err, token){
                if(err) throw err;
                var login_data = {
                    u_No: rows[0].u_No,
                    u_Last: rows[0].u_Last,
                    Token: token
                };
                res.json(login_data);
                console.log('res json data');
            });
        }
        else{
            console.log('User login fail: ' + user.u_Id);
            res.send(false);
        }       
        console.log('the end');
    });
    
};

//회원 정보 수정
const update = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
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
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

//회원 정보 삭제
const del = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
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
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

//id, pw, name, email 정규식
const idReg = /^[a-z]+[a-z0-9]{2,14}$/;
const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{3,15}$/;
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
    idCheck: idCheck,
    add: add,
    login: login,
    update: update,
    del: del    
};