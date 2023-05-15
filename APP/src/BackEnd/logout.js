const express = require('express');
const session = require('express-session');
const cors = require('cors');
const router = express.Router();

// Configure session middleware
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));


router.use(cors({
  origin: 'http://localhost:3006',
  credentials: true
}));

router.post('/', (req, res) => {
  console.log('hello')
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Could not log out' });
    }

    res.clearCookie('connect.sid');
    res.clearCookie('sessionID');
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

module.exports = router;
