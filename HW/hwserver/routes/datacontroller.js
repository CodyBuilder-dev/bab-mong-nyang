const mariadb = require('mariadb');
const mybatismapper = require('mybatis-mapper');

const connection = mariadb.createConnection('../config/database.js');
mybatismapper.createMapper(['../mapper/feeding.xml']);
let format = {language: 'sql', indent: ' '};

var feeding = {
    _ID:0,
    _date:0,
    _time:0,
    feed_remain:0,
    _feeded:0,
    total_remain:0
};

module.exports.selectAll = function(req,res){
        let query = mybatismapper.getStatement('feeding','selectAll',format);
        connection.query(query,fuction(err,rows){
            if(err) throw err;
            console.log("selectAll success!");
            res.json(rows);
        });
    };
