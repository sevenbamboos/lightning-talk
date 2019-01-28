'user strict';

const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'developer',
  password : '12345678',
  database : 'test'
});

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;
