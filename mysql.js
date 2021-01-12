var mysql =require('mysql');

var conn = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'mJkoOx7ZdP',
    password : 'vwMW3zLd2n',
    database : 'mJkoOx7ZdP'
  });
module.exports = conn;

