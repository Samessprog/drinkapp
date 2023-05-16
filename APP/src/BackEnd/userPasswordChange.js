const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('./DB');
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;

router.post('/', (req, res) => {
    const { userID, password, newPassword } = req.body;
  
    db.query('SELECT * FROM users WHERE ID_User = ? AND Password = ?', [userID, password], (err, results) => {

        if (!passwordRegex.test(newPassword)) {
            res.status(400).json({ success: false, message: 'Invalid password' });
            return;
        }

        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Failed to check user password' });
            return;
        }

        if (results.length === 0) {
            res.status(400).json({ success: false, message: 'Invalid password' });
            return;
        }

        db.query('UPDATE users SET Password = ? WHERE ID_User = ?', [newPassword, userID], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Failed to update user password' });
                return;
            }

            res.json({ success: true });
        });
    });
});

module.exports = router;
