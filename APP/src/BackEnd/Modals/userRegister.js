const express = require('express');
const router = express.Router();
const db = require('../DB')

async function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as count FROM users WHERE email = ?', email, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const count = result[0].count;
        if (count > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
const phoneRegex = /^\+?\d{1,12}$/;

router.post('/', async (req, res) => {

  const { email, password, rePassword, phone, Nick } = req.body;

  const emailExists = await checkEmailExists(email);
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ success: false, message: 'Invalid phone number' });
    return;
  }

  // Sprawdzenie poprawności hasła
  if (!passwordRegex.test(password)) {
    res.status(400).json({ success: false, message: 'Invalid password format' });
    return;
  }

  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: 'Invalid email format' });
    return;
  }

  // Sprawdzenie, czy email już istnieje w bazie danych
  if (emailExists) {
    res.status(400).json({ success: false, message: 'Email already exists' });
    return;
  }

  // Sprawdzenie, czy hasła są zgodne
  if (password !== rePassword) {
    res.status(400).json({ success: false, message: 'Passwords do not match' });
    return;
  }

  if (email === '') {
    res.status(400).json({ success: false, message: 'The email field must be completed' });
    return;
  }

  if (Nick === '') {
    res.status(400).json({ success: false, message: 'The Nick name field must be completed' });
    return;
  }

  const user = { email, password, phone, Nick };

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Failed to register user' });
      return;
    }

    res.json({ success: true });
  });
});

module.exports = router;
