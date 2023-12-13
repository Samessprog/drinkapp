const express = require('express');
const router = express.Router();
const db = require('../DB');

router.get('/', (req, res) => {
    db.query('SELECT ID_User, email, Password, phone, Nick, IsBlocked, Role  FROM users', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            res.status(200).json(results); // Wyślij dane użytkowników do frontendu w formacie JSON
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    });
});

module.exports = router;
