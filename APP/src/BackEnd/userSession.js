const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('./DB')

router.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    express: 7 * 24 * 60 * 1000,
  },
}));

router.get('/', (req, res, next) => {
  console.log('hgh')

  if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = req.session.user;
  res.json(user);
});

module.exports = router;



