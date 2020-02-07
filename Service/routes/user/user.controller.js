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

var err_result = {
    IsError: true,
    Message: 'msg'
}

//전체 User 데이터 호출(비동기)
const selectAll = function (req, res) {
    //getStatement('Namespace 이름', 'Sql ID', 'Prameters', 'format')
    let query = mybatisMapper.getStatement('user', 'selectAll', format);
    connection.query(query, function(err, rows) {
        if(err) { //throw err;
            console.log(err);
            err_result.Message = '전체 User 데이터를 불러오던 중 오류가 발생하였습니다';
            res.json(err_result);
            return;
        }
        console.log('User selectAll ok');
        res.json(rows);
    });    
};

//U_No에 맞는 데이터 호출(동기)
const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)) {        
        user.u_No = req.params.no;
        let query = mybatisMapper.getStatement('user', 'selectOne', user, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '해당 User 데이터를 불러오던 중 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            if(rows[0]){
                console.log('User selectOne ok: ' + user.u_No);
                res.json(rows[0]);
            }
            else{
                console.log('User selectOne fail: ' + user.u_No);
                err_result.Message = '해당 User 데이터가 존재하지 않습니다';
                res.json(err_result);
            }            
        });
    }
    else res.json(err_result);
};

//id 중복 확인
const idCheck = function (req, res) {
    user.u_Id = req.params.id;
    let query = mybatisMapper.getStatement('user', 'idCheck', user, format);
    connection.query(query, function(err, rows) {
        if(err) {
            console.log(err);
            err_result.Message = 'ID 중복 확인하는 중 오류가 발생하였습니다';
            res.json(err_result);
            return;
        }
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
    user = {...user , ...req.body};
    if(addCheck(req.body)){
        console.log('true받음');
        let query = mybatisMapper.getStatement('user', 'addUser', user, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '회원 가입 등록 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            console.log('User add ok: ' + user.u_Id);
            res.send(true);
        });
    }
    else{
        console.log('User add fail: ' + req.body.u_Id);
        res.json(err_result);
    }    
};

//로그인
const login = function (req, res) {
    user = {...user , ...req.body};
    let query = mybatisMapper.getStatement('user', 'loginUser', user, format);
    connection.query(query, function(err, rows) {
        if(err) {
            console.log(err);
            err_result.Message = '로그인 중 오류가 발생하였습니다';
            res.json(err_result);
            return;
        }
        if(rows[0]){
            console.log('User login check ok: ' + user.u_Id);
            var payload = {u_Id: user.u_Id};
            var options = {expiresIn: '59m'}; //만료 시간 테스트 완료
            jwt.sign(payload, secretKey.secret, options, function(err, token){
                if(err) {
                    console.log(err);
                    err_result.Message = '토큰 발급 중 오류가 발생하였습니다';
                    res.json(err_result);
                    return;
                }
                var login_data = {
                    u_No: rows[0].u_No,
                    u_Last: rows[0].u_Last,
                    Token: token
                };
                res.json(login_data);
                console.log('send login token ok');
            });
        }
        else{
            console.log('User login fail: ' + user.u_Id);
            res.send(false);
        }
    });    
};

//회원 정보 수정
const update = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        user = {...user , ...req.body};
        if(updateCheck(req.body)){
            let query = mybatisMapper.getStatement('user', 'updateUser', user, format);
            connection.query(query, function(err, rows) {
                if(err) {
                    console.log(err);
                    err_result.Message = '회원 정보 수정 중 오류가 발생하였습니다';
                    res.json(err_result);
                    return;
                }               
                if(rows.changedRows>0) {
                    console.log('User update ok: ' + user.u_Id);
                    res.send(true);
                }
                else{
                    console.log('User update fail: ' + user.u_Id);
                    err_result.Message = '수정할 회원 정보가 존재하지 않습니다';
                    res.json(err_result);
                    return;
                }
            });
        }
        else{
            res.json(err_result);            
            console.log('User update fail: ' + req.body.u_Id);
        }
    }
    else res.json(err_result);
};

//회원 정보 삭제
const del = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        user.u_No = req.params.no;
        let query = mybatisMapper.getStatement('user', 'deleteUser', user, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                err_result.Message = '회원 정보 삭제 중 오류가 발생하였습니다';
                res.json(err_result);
                return;
            }
            if(rows.affectedRows>0){
                console.log('User delete ok: ' + user.u_No);
                res.send(true);
            }
            else{
                console.log('User delete fail: ' + user.u_No);
                err_result.Message = '삭제할 회원 정보가 존재하지 않습니다';
                res.json(err_result);
                return;
            }
        });
    }
    else res.json(err_result);
};

//id, pw, name, email 정규식
const idReg = /^[a-z]+[a-z0-9]{2,14}$/;
const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{3,15}$/;
const nameReg = /^[가-힣]{2,4}|[a-zA-Z]{2,15}$/;
const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

function addCheck(body){
    if(!idReg.test(body.u_Id)) {
        console.log('Wrong Id: ' + body.u_Id);
        err_result.Message = 'ID는 첫째자리는 영문소문자로 시작하고 영문소문자와 숫자를 사용할 수 있으며, 3자리 이상 15자리 이하의 길이여야 합니다';
        return false;
    }
    else if(!updateCheck(body)){
        return false;
    }
    else{
        console.log('true보냄');
        return true;
    }
}

function updateCheck(body){
    if(!pwReg.test(body.u_Pw)){
        console.log('Wrong Pw: ' + body.u_Pw);
        err_result.Message = '패스워드는 첫째자리는 영문자로 시작하고 영문자, 숫자, 특수문자를 포함해야 하며, 3자리 이상 15자리 이하의 길이여야 합니다';
        return false;
    }
    else if(!nameReg.test(body.u_Name)){
        console.log('Wrong Name: ' + body.u_Name);
        err_result.Message = '이름은 한글 2자리 이상 4자리 이하 또는 영문자 2자리 이상 15자리 이하의 길이여야 합니다';
        return false;
    }
    else if(!emailReg.test(body.u_Email)){
        console.log('Wrong Email: ' + body.u_Email);
        err_result.Message = '올바른 이메일 형식에 맞게 입력해주세요';
        return false;
    }
    else{
        return true;
    }
}

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
    idCheck: idCheck,
    add: add,
    login: login,
    update: update,
    del: del    
};