const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/logdata.xml']);
mybatisMapper.createMapper(['./mapper/hw.xml']);
let format = {language: 'sql', indent: ' '};

var logdata = {
    l_No: 0,
    d_No: 0,
    l_Time: 'l_Time',
    l_Remain: 0,
    l_Empty: false,
    l_Amount: 0
};

var result = {
    validation: false,
    message: '',
    data: []
};

const selectAll = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        logdata.d_No = req.params.no;
        let query = mybatisMapper.getStatement('logdata', 'selectAll', logdata, format);
        connection.query(query, function(err, rows) {
            if(err){
                result.validation = false;
                result.message = '전체 log 데이터를 호출하는데 에러가 발생했습니다';
                result.data = [];
                res.json(result);
                return;
            }            
            console.log('Logdata selectAll ok');
            res.json(rows);
        });
    }
    else res.json(result);
};

var bars = [];

const selectChart = function (req, res) {
    if(checkToken(req.headers.authorization)) {
        let temp = {
            d_No: 0
        }
        temp.d_No = req.params.no;
        let query = mybatisMapper.getStatement('logdata', 'selectChart', temp, format);
        connection.query(query, function(err, rows) {
            if(err){
                result.validation = false;
                result.message = '';
            }
            if(!rows[0]){
                console.log("selectChart fail");
                res.send(false);
            }
            else{
                for(var i = 0; i<rows.length; i++){
                    var bars_type = {
                        label : '00-00',
                        items : [
                            {
                                value: 0
                            }
                        ]
                    }
                    bars_type.label = rows[i].l_Time2;
                    bars_type.items[0].value = rows[i].l_Remain;
                    bars.push(bars_type);
                }
                res.send(bars);
                bars = [];
            }        
        });
    }
    else res.json(result);
}

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
    selectChart: selectChart
};