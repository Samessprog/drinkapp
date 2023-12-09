const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../DB');

router.use((req, res, next) => {
  next();
});

router.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    express: 7 * 24 * 60 * 1000,
  },
}));


router.post('/', (req, res) => {
  const { email, password } = req.body;

  res.cookie('my-cookie', 'cookie-value');

  db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {

    if (err) {
      res.status(500).json({ success: false, message: 'Failed to login' });
      return;
    }

    const user = results[0];
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // if (!emailRegex.test(email) || email === '') {
    //   res.status(500).json({ success: false, message: 'Invalid email address' });
    //   return;
    // }

    // if (!passwordRegex.test(password)) {
    //   res.status(500).json({ success: false, message: 'Invalid password' });
    //   return;
    // }

    if (user?.IsBlocked === 1) {
      res.status(401).json({ success: false, message: 'Your account has been blocked' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ success: false, message: 'Email not found' });
      return;
    }

    if (password !== user.Password) {
      res.status(401).json({ success: false, message: 'Incorrect password' });
      return;
    }

    const sessionID = uuidv4();

    req.session.sessionID = sessionID;
    req.session.email = user.email;
    req.session.user = { email: user.email, phone: user.phone, nick: user.Nick, userID: user.ID_User, role: user.Role };
    res.cookie('sessionID', sessionID, { maxAge: 900000, httpOnly: true, sameSite: 'none', secure: true });
    res.json({ success: true, user: req.session.user });
  });
});


module.exports = router;
