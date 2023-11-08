const express = require('express');
const router = express.Router();
const db = require('../DB');

router.post('/api/blockUser', async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        res.status(400).json({ error: 'userID is required' });
        return;
    }
    
    db.query('SELECT IsBlocked FROM users WHERE ID_User = ?', userID, (err, results) => {
        console.log(results)

        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const currentBlockedValue = results[0].IsBlocked;

        // Zmień wartość boolean na przeciwną
        const newBlockedValue = currentBlockedValue === 1 ? 0 : 1;

        // Zaktualizuj wartość boolean w bazie danych
        db.query('UPDATE users SET IsBlocked = ? WHERE ID_User = ?', [newBlockedValue, userID], (err, updateResults) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json({ message: 'User blocked status updated successfully' });
        });
    });
});


module.exports = router;
