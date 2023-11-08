
const express = require('express');
const router = express.Router();
const db = require('../DB');

router.get('/api/userIMG', (req, res) => {
    const email = req.session.email;

    db.query('SELECT userIMG FROM users WHERE email = ?', email, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            const userIMGBuffer = results[0].userIMG;
            res.type('image/png');
            res.send(userIMGBuffer);
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    });
});

module.exports = router;
