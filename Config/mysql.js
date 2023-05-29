const mysql = require('mysql');

let connection;

connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 3306,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
})

module.exports = connection;