const mysql = require('mysql'); //mysql 사용
const dbconfig = require('../../config/database.js'); //dbconfig: 데이터베이스 접속 환경 설정
const connection = mysql.createConnection(dbconfig); //connection: mysql 연결

const jwt = require('jsonwebtoken');
const secretKey = require("../../config/jwt");

// . : 현재 폴더 경로, .. : 상위 폴더
const mybatisMapper = require('mybatis-mapper'); //mybatis-mapper 사용
mybatisMapper.createMapper(['./mapper/join.xml']); //createMapper: 작성된 Mapper Load
let format = {language: 'sql', indent: ' '};

var Main_data = {
    u_No: 0,
    u_Name: 'u_Name',
    u_Last: 0,
    device : []
};

const selectMain = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        Main_data.u_No = req.params.no;
        let query = mybatisMapper.getStatement('join', 'selectUser', Main_data, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(!rows[0]){
                console.log('Main_data selectUser fail');
                res.send(false);
            }
            else{
                console.log('Main_data selectUser ok');
                Main_data.u_Name = rows[0].u_Name;
                Main_data.u_Last = rows[0].u_Last;
                let query2 = mybatisMapper.getStatement('join', 'selectDevice', Main_data, format);
                connection.query(query2, function(err2, rows2) {
                    if(err2) throw err2;
                    if(!rows2[0]){
                        console.log('Main_data selectDevice fail');
                        res.send(false);
                    }
                    else{
                        for(var i = 0; i<rows2.length; i++){
                            var device_temp = {
                                d_No : 0,
                                d_Name : 'd_Name'
                            }
                            device_temp = rows2[i];
                            Main_data.device.push(device_temp);
                        }
                        console.log('Main_data selectDevice ok');
                        res.send(Main_data);
                        Main_data.device = [];
                    }
                });            
            };
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const changeLast = function (req, res) {
    if(checkToken(req.headers.authorization)==true) {
        var change_temp = {
            u_No: 0,
            d_No: 0
        }
        change_temp = {...change_temp , ...req.body};
        let query = mybatisMapper.getStatement('join', 'changeLast', change_temp, format);
        connection.query(query, function(err, rows) {
            if(err) throw err;
            if(rows.changedRows>0) {
                console.log('u_Last update ok: ' + change_temp.u_No);
                res.send(true);
            }
            else{
                console.log('u_Last update fail' + change_temp.u_No);
                res.send(false);
            }
        });
    }
    else res.send('다시 로그인 해주세요!!!!!');
};

const testcode = function (req, res) {
    console.log('hi testcode');
    console.log(req.body.data);
};

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
    selectMain: selectMain,
    changeLast: changeLast,
    testcode: testcode
};