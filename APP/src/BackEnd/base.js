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

  // Sprawdzenie, czy hasła są zgodne
  if (password !== rePassword) {
    res.status(400).json({ success: false, message: 'Passwords do not match' });
    return;
  }

  // Sprawdzenie poprawności numeru telefonu
  const phoneRegex = /^\+?\d{0,12}$/;
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ success: false, message: 'Invalid phone number' });
    return;
  }

  // Sprawdzenie poprawności hasła
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ success: false, message: 'Invalid password format' });
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


//LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log(email)
  console.log(password)

  db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    const user = results[0];


    if (password !== user.Password) {
      res.status(401).json({ success: false, message: 'Incorrect password' });
      return;
    }

    res.json({ success: true, user: { email: user.email, phone: user.phone } });
  });
});





app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



