// const mysql = require('mysql');
// const mybatisMapper = require('mybatis-mapper');

// var conn = require('../../config/database.js');
// const backconn = mysql.createConnection(conn); 

// mybatisMapper.createMapper(['./mapper/feeding.xml']);
// let format = {language: 'sql', indent: ' '};

// var sample = {
    
// };

// var LOG;
// const selectAll = function (req, res) {
//     let query = mybatisMapper.getStatement('sample', 'selectAll', format);
//     console.log(query);
//     backconn.query(query, function(err, rows) {
//         if(err) throw err;
//         console.log('SELECTALL');
//         LOG = res.json(rows);
//         console.log(LOG);
//     });
// };


// const logUpdate = function(req,res){
//     let query = mybatisMapper.getStatement('sample', 'logUpdate', format);
//     console.log(query);
//     backconn.query(query, function(err, rows) {
//         if(err) throw err;
//         console.log('Data Update!');
//         res.json(rows);
//     });
// }


// module.exports = {
//     selectAll: selectAll,
//     logUpdate: logUpdate
// };


