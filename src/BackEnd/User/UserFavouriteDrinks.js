const express = require('express');
const router = express.Router();
const db = require('../DB');


router.get('/api/takeFavouriteUserDrink', async (req, res) => {
    const userIDs = req.session.user?.userID;

    // Fetch the DrinkIDs for the given UserID
    const query = `SELECT DrinkID FROM userfavouritedrink WHERE UserID = ?`;

    db.query(query, [userIDs], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving user favorite drinks.' });
        } else {
            // Extract the DrinkID values from the query results
            const drinkIDs = results.map((row) => row.DrinkID);
            res.status(200).json({ drinkIDs });
        }
    });
});

module.exports = router;
