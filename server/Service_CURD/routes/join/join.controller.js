const mysql = require('mysql'); //mysql 사용
const dbconfig = require('../../config/database.js'); //dbconfig: 데이터베이스 접속 환경 설정
const connection = mysql.createConnection(dbconfig); //connection: mysql 연결

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
    Main_data.u_No = req.params.no;
    let query = mybatisMapper.getStatement('join', 'selectUser', Main_data, format);
    connection.query(query, function(err, rows) {
        if(err) throw err;
        if(!rows[0]){
            console.log('Main_data selectUser fail');
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
};

const changeLast = function (req, res) {
    var change_temp = {
        u_No: 0,
        d_No: 0
    }
    change_temp = req.body;
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
};

module.exports = {
    selectMain: selectMain,
    changeLast: changeLast
};