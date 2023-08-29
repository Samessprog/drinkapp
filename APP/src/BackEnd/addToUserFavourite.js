const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('./DB');



router.use('/', async (req, res) => {
    const { id, sessionidx } = req.body;

    const checkQuery = `SELECT * FROM userfavouritedrink WHERE UserID = ? AND DrinkID = ?`;
    db.query(checkQuery, [sessionidx, id], (checkError, checkResults) => {
        if (checkError) {
            console.error(checkError);
            res.status(500).json({ message: 'Error checking user favorites.' });
        } else {
            if (checkResults.length > 0) {
                const deleteQuery = `DELETE FROM userfavouritedrink WHERE UserID = ? AND DrinkID = ?`;
                db.query(deleteQuery, [sessionidx, id], (deleteError) => {
                    if (deleteError) {
                        console.error(deleteError);
                        res.status(500).json({ message: 'Error removing drink from user favorites.' });
                    } else {
                        res.status(200).json({ message: 'Drink removed from user favorites.' });
                    }
                });
            } else {
                const insertQuery = `INSERT INTO userfavouritedrink (UserID, DrinkID) VALUES (?, ?)`;
                db.query(insertQuery, [sessionidx, id], (insertError) => {
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
