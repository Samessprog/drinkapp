const express = require('express');
const session = require('express-session');
const cors = require('cors');
const router = express.Router();
const db = require('./DB');

// Configure session middleware
router.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
}));

// Use cors middleware
router.use(cors({
  origin: 'http://localhost:3006',
  credentials: true
}));


router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return;
    }
    
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

module.exports = router;
