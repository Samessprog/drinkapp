const express = require('express');
const router = express.Router();
const db = require('../DB');

router.post('/api/removeFromUserFavourite', async (req, res) => {
    const { drinkID, userID } = req.body;

    const deleteQuery = 'DELETE FROM userfavouritedrink WHERE userID = ? AND drinkID = ?';

    db.query(deleteQuery, [userID, drinkID], (error, results) => {
        if (error) {
            console.error('Error deleting favorite:', error);
            res.status(500).json({ error: 'An error occurred while deleting the favorite.' });
        }
    });
});

module.exports = router;
