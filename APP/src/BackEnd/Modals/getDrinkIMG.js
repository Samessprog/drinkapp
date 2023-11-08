const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB');

router.get('/api/fetchDrinkIMG/:ID_Drink', async (req, res) => {
    const { ID_Drink } = req.params;

    try {
        const sql = 'SELECT IMG FROM drink WHERE ID_Drink = ?';
        connectionToDrinksDB.query(sql, [ID_Drink], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Błąd podczas pobierania zdjęcia' });
            } else {
                res.json({ image: result[0].IMG });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania zdjęcia' });
    }
})

module.exports = router;

