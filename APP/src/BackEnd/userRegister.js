const express = require('express');
const router = express.Router();
const db = require('./DB')

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

router.post('/', async (req, res) => {
  const { email, password, rePassword, phone, Nick, img } = req.body;


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


  // Sprawdzenie poprawności numeru telefonu
  const phoneRegex = /^\+?\d{1,12}$/;
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ success: false, message: 'Invalid phone number' });
    return;
  }

  // Sprawdzenie poprawności hasła
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ success: false, message: 'Invalid password format' });
    return;
  }

  // Sprawdzenie, czy email już istnieje w bazie danych
  const emailExists = await checkEmailExists(email);
  if (emailExists) {
    res.status(400).json({ success: false, message: 'Email already exists' });
    return;
  }

  const user = { email, password, phone, Nick, userImg };

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Failed to register user' });
      return;
    }

    res.json({ success: true });
  });
});

module.exports = router;
