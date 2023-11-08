const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB');

router.get('/api/drinkDetails/:id', async (req, res) => {
    const id = req.params.id;
    console.log('XD')
    console.log(id)
    const sql = 'SELECT ID_DRINK, DrinkName, DifficultyLevel, Taste, DrinkType, Description, Ingredients, Preparation, drinkHistory, Rate FROM drink WHERE ID_DRINK = ?';

    connectionToDrinksDB.query(sql, [id], (err, results, fields) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('Error executing query');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
