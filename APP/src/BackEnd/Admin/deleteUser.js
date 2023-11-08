const express = require('express');
const router = express.Router();
const db = require('../DB');

router.post('/api/deleteUser', async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        res.status(400).json({ error: 'userID is required' });
        return;
    }

    db.query('DELETE FROM users WHERE ID_User = ?', userID, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});


module.exports = router;
