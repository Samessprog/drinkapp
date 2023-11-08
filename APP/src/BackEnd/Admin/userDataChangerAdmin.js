const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../DB');

router.post('/', async (req, res) => {
    const { newUserEmail, newUserPass, userID, newUserNick, newUserPhone, userRole } = req.body;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!passwordRegex.test(newUserPass)) {
        res.status(400).json({ success: false, message: 'Invalid password' });
        return;
    }

    if (!emailRegex.test(newUserEmail)) {
        res.status(400).json({ success: false, message: 'Invalid email' });
        return;
    }

    try {
        // Aktualizacja adresu e-mail i hasła użytkownika w bazie danych
        db.query(
            'UPDATE users SET email = ?, password = ?, phone = ?, Nick = ?, Role = ?  WHERE ID_User = ?',
            [newUserEmail, newUserPass,newUserNick,newUserPhone,userRole, userID],
            (err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: 'Failed to update user data' });
                    return;
                }

                res.json({ success: true });
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
