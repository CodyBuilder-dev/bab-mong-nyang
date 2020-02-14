const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/good.xml']);
let format = {language: 'sql', indent: ' '};

var good = { //type 모두 String으로 변환하고 Test
    g_No: 0,
    u_No: 0,
    r_No: 0
};

var result = {
    validation: false,
    message: '',
    data: []
}

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        good.u_No = req.params.no;
        let query = mybatisMapper.getStatement('review', 'selectAll', review, format);
        connection.query(query, function(err, rows) {
            if(err){
                result.validation = false;
                result.message = '해당 사료의 모든 리뷰를 호출하는데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            }
            console.log('review selectAll ok: ' + review.f_No);
            result.validation = true;
            result.message = '해당 사료의 모든 리뷰 호출 성공';
            result.data = rows;
            res.json(result);
        });
    }
    else res.json(result);
};

const selectOne = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        review.r_No = req.params.no;
        let query = mybatisMapper.getStatement('review', 'selectOne', review, format);
        connection.query(query, function(err, rows) {
            if(err){
                console.log(err);
                result.validation = false;
                result.message = '해당 리뷰를 호출하는데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            }
            console.log('review selectOne ok: ' + review.r_No);
            result.validation = true;
            result.message = '해당 리뷰 호출 성공';
            result.data = rows[0];
            res.json(result);
        });
    }
    else res.json(result);
};

const add = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        review = {...review , ...req.body}; //u_No, f_No, r_Rank, r_Positive, r_Negative 
        let query = mybatisMapper.getStatement('review', 'addReview', review, format);
        connection.query(query, function(err, rows){
            if(err){
                console.log(err);
                result.validation = false;
                result.message = '해당 리뷰를 등록하는데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            }
            result.validation = true;
            result.message = '리뷰 등록 성공';
            result.data = [];
            res.json(result);
        });
    }
    else res.json(result);
};


const update = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        review = req.body;
        console.log(req.body);
        let query = mybatisMapper.getStatement('review', 'updateReview', review, format);
        connection.query(query, function(err, rows) {
            if(err){
                console.log(err);
                result.validation = false;
                result.message = '해당 리뷰를 수정하는데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            }
            console.log('review update ok: ' + review.d_No);
            result.validation = true;
            result.message = '해당 리뷰 수정 성공';
            result.data = [];
            res.json(result);
        });
    }
    else res.json(result);
};

const del = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        review.r_No = req.params.no;
        let query = mybatisMapper.getStatement('review', 'deleteReview', review, format);
        connection.query(query, function(err, rows) {
            if(err){
                console.log(err);
                result.validation = false;
                result.message = '해당 리뷰를 삭제하는데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            }            
            console.log('review delete ok: ' + review.r_No);
            result.validation = true;
            result.message = '해당 리뷰 삭제 성공';
            result.data = [];
            res.json(result);
        });
    }
    else res.json(result);
};

function checkToken(token){
    var tempToken = false;
    jwt.verify(token, secretKey.secret, (err, decoded) => {
        if(err) {
            console.log('토큰 에러 발생!');
            console.log(err);
            result.validation = false;
            result.message = '다시 로그인 해주세요!';
            result.data = [];
            tempToken = false;
        }
        else {
            console.log('유효한 토큰입니다!');
            tempToken = true;
        }
    });
    return tempToken;
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    add: add,
    update: update,
    del: del
};