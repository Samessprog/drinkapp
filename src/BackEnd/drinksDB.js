const mysql = require('mysql');

const connectionToDrinksDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'drinks'
});

connectionToDrinksDB.connect((err) => {
    if (err) {
        throw err;
    }
});

module.exports = connectionToDrinksDB;

