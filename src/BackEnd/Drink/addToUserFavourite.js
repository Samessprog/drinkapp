const express = require('express');
const router = express.Router();
const db = require('../DB');

router.use('/', async (req, res) => {
    const { id,  sessionIDx } = req.body;

    const checkQuery = `SELECT * FROM userfavouritedrink WHERE UserID = ? AND DrinkID = ?`;
    db.query(checkQuery, [ sessionIDx, id], (checkError, checkResults) => {
        if (checkError) {
            res.status(500).json({ message: 'Error checking user favorites.' });
        } else {
            if (checkResults.length > 0) {
                const deleteQuery = `DELETE FROM userfavouritedrink WHERE UserID = ? AND DrinkID = ?`;
                db.query(deleteQuery, [ sessionIDx, id], (deleteError) => {
                    if (deleteError) {
                        console.error(deleteError);
                        res.status(500).json({ message: 'Error removing drink from user favorites.' });
                    } else {
                        res.status(200).json({ message: 'Drink removed from user favorites.' });
                    }
                });
            } else {
                const insertQuery = `INSERT INTO userfavouritedrink (UserID, DrinkID) VALUES (?, ?)`;
                db.query(insertQuery, [ sessionIDx, id], (insertError) => {
                    if (insertError) {
                        console.error(insertError);
                        res.status(500).json({ message: 'Error adding drink to user favorites.' });
                    } else {
                        res.status(200).json({ message: 'Drink added to user favorites successfully.' });
                    }
                });
            }
        }
    });
});


module.exports = router;
