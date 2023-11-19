const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('../DB');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{1,12}$/;
const nickRegex = /^[a-zA-Z0-9_-]{3,16}$/;

router.post('/', (req, res) => {

    const { email, phone, Nick, userID } = req.body;

    console.log(Nick)

    if (!nickRegex.test(Nick)) {
        res.status(400).json({ success: false, message: 'Invalid nick format' });
        return;
    }

    if (!emailRegex.test(email)) {
        res.status(400).json({ success: false, message: 'Invalid email format' });
        return;
    }

    if (!phoneRegex.test(phone)) {
        res.status(400).json({ success: false, message: 'Invalid phone number format' });
        return;
    }


    db.query('SELECT * FROM users WHERE email = ? AND ID_User != ?', [email, userID], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Failed to check email availability' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ success: false, message: 'Email already in use' });
            return;
        }

        // Sprawdź, czy nazwa użytkownika (nick) jest już w użyciu
        db.query('SELECT * FROM users WHERE Nick = ? AND ID_User != ?', [Nick, userID], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Failed to check nick availability' });
                return;
            }

            if (results.length > 0) {
                res.status(400).json({ success: false, message: 'Nick already in use' });
                return;
            }

            // Zaktualizuj dane użytkownika w bazie danych
            db.query('UPDATE users SET email = ?,  phone = ?, Nick = ? WHERE ID_User = ?', [email, phone, Nick, userID], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, message: 'Failed to update user data' });
                    return;
                }

                // Zaktualizuj dane w sesji
                req.session.user = { ...req.session.user, phone, Nick };

                res.json({ success: true, user: req.session.user });
            });
        });
    });
});

module.exports = router;
