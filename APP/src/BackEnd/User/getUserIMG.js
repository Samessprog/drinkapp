
const express = require('express');
const router = express.Router();
const db = require('../DB');

router.get('/api/userIMG', (req, res) => {
    const userID = req.query.userID; // Pobieranie userID z zapytania URL
    console.log(userID)

    db.query('SELECT userIMG FROM users WHERE ID_User = ?', userID, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            const userIMGData = results[0].userIMG.toString('base64'); // Konwersja obrazka do base64
            const responseData = {
                userIMG: userIMGData,
                contentType: 'image/png' // Tutaj możesz określić typ MIME twojego obrazka
            };
            res.json(responseData);
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    });
});

module.exports = router;
