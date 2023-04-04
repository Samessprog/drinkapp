const mysql = require('mysql');
const express = require('express');

const app = express();

app.use(function (req, res, next) {
    console.log('XD')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'drinks'
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.get('/drinks', (req, res) => {
    const sql = 'SELECT * FROM drink ORDER BY ID_Drink DESC';
    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('Error executing query');
            return;
        }
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});

