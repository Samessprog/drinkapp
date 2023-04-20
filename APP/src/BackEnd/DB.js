const mysql = require('mysql'); // importujemy mysql

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drink_users' // nazwa bazy danych
});

db.connect((err) => {
  if (err) {
    throw err;
  }
});




module.exports = db;
