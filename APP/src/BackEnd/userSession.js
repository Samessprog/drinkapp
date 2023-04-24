const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('./DB')

router.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
}));


router.post('/', (req, res, next) => {
    const sessionId = req.sessionID;
    res.json({ sessionId });
  });


module.exports = router;



