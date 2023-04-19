const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql'); // importujemy mysql
const app = express();
const port = 3000;

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

app.use(bodyParser.json());
app.use(cors());


//REGISTER
app.post('/api/register', (req, res) => {
    const { email, password, rePassword, phone } = req.body;

    if (password !== rePassword) {
        res.status(400).json({ success: false, message: 'Passwords do not match' });
        return;
    }

    const user = { email, password, phone };

    db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Failed to register user' });
            return;
        }

        res.json({ success: true });
    });
});



  

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



