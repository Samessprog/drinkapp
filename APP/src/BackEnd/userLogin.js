const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('./DB');

router.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
}));

router.post('/', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Failed to login' });
      return;
    }

    if (email === '') {
      res.status(500).json({ success: false, message: 'The email field must be completed' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ success: false, message: 'Email not found' });
      return;
    }

    const user = results[0];
    if (password !== user.Password) {
      res.status(401).json({ success: false, message: 'Incorrect password' });
      return;
    }

    const sessionID = uuidv4();
    req.session.sessionID = sessionID;

    req.session.user = { email: user.email, phone: user.phone, nick: user.Nick, sessionID: sessionID };

    res.json({ success: true, user: req.session.user });
  });
});

module.exports = router;
