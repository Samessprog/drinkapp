
const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB');


router.get('/', async (req, res) => {
    const sql = 'SELECT ID_DRINK, DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Description, Ingredients, Preparation, drinkHistory, Rate, user_id, Date_Of_Creation, DrinkBlock FROM drink WHERE Accepted = 1';
    connectionToDrinksDB.query(sql, (err, results, fields) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('Error executing query');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
