const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/feed.xml']);
let format = {language: 'sql', indent: ' '};

var feed = {
    f_No: 0,
    f_Name: 'f_Name',
    f_Species: 'f_Species',
    f_Manufacturer: 'f_Manufacturer',
    f_Protein: 11.11,
    f_Fat: 11.11,
    f_Calcium: 11.11,
    f_Phosphorus: 11.11,
    f_Fiber: 11.11,
    f_Ash: 11.11,
    f_Moisture: 11.11
};

var result = {
    validation: false,
    message: '',
    data: []
};

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        let query = mybatisMapper.getStatement('feed', 'selectAll', format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                result.validation = false;
                result.message = '전체 Feed 데이터를 불러오는 데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            }            
            console.log('Feed selectAll ok');
            result.validation = true;
            result.message = '전체 Feed 데이터 호출 성공';
            result.data = rows;
            res.json(result);
        });
    }
    else res.json(result);
};

const basic = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        feed.f_No = req.params.no;
        let query = mybatisMapper.getStatement('feed', 'selectBasic', feed, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                result.validation = false;
                result.message = '해당 Feed의 Basic 데이터를 불러오는 데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            } 
            console.log('Feed selectBasic ok: ' + feed.f_No);
            result.validation = true;
            result.message = '해당 Feed의 Basic 데이터 호출 성공';
            result.data = rows[0];
            res.json(result);
        });
    }
    else res.json(result);
};

const nutrient = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        feed.f_No = req.params.no;
        let query = mybatisMapper.getStatement('feed', 'selectNutrient', feed, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                result.validation = false;
                result.message = '해당 Feed의 Nutrient 데이터를 불러오는 데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            } 
            console.log('Feed selectNutrient ok: ' + feed.f_No);
            result.validation = true;
            result.message = '해당 Feed의 Nutrient 데이터 호출 성공';
            result.data = rows[0];
            res.json(result);
        });
    }
    else res.json(result);
};

const calNum = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        var inputData = {
            f_No: 0,
            d_No: 0,
            d_Nutra: false
        };
        var getData = {
            d_Weight: 1.1,
            f_Protetin: 11.11,
            f_Fat: 11.11,
            f_Calcium: 1.11,
            f_Phosphorus: 1.11,
            f_Fiber: 1.11,
            f_Ash: 7.50,
            f_Moisture: 10.00
        };
        let get_query = mybatisMapper.getStatement('feed', 'getData', inputData, format);
        connection.query(get_query, function(err, rows) {
            if(err) {
                console.log(err);
                result.validation = false;
                result.message = '해당 Device와 Feed 데이터를 불러오는 데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            } 
            console.log('Device&Feed Data getData ok: ' + inputData.d_No);
            
            
            
        });
    }
    else res.json(result);
};

const calDirect = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        feed.f_No = req.params.no;
        let query = mybatisMapper.getStatement('feed', 'selectNutrient', feed, format);
        connection.query(query, function(err, rows) {
            if(err) {
                console.log(err);
                result.validation = false;
                result.message = '해당 Feed의 Nutrient 데이터를 불러오는 데 오류가 발생하였습니다';
                result.data = [];
                res.json(result);
                return;
            } 
            console.log('Feed selectNutrient ok: ' + feed.f_No);
            result.validation = true;
            result.message = '해당 Feed의 Nutrient 데이터 호출 성공';
            result.data = rows[0];
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
    basic: basic,
    nutrient: nutrient,
    calNum: calNum,
    calDirect: calDirect
};