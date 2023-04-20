const express = require('express');
const session = require('express-session');
const cors = require('cors');
const router = express.Router();
const db = require('./DB');

// Configure session middleware
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Use cors middleware
router.use(cors({
  origin: 'http://localhost:3006',
  credentials: true
}));

// Your logout route
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
