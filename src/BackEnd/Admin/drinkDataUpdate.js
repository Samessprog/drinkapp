const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB');

const multer = require('multer');
const upload = multer();

router.post('/', upload.single('drinkImg'), async (req, res) => {

    const { drinkID, drinkNameInput, drinkDescriptionInput, drinkHistoryInput, drinkNutritionalValues ,ing, prep, drinkLevelInput, drinkTasteInput, drinkTypeInput } = req.body;

    const ingredient = ing.replace(/,/g, '.');
    const preparation = prep.replace(/,/g, '.');

    const imageData = req.file.buffer;

    const sql = `
    UPDATE drink
    SET 
      DrinkName = ?,
      Description = ?,
      drinkHistory = ?,
      Drink_Nutritional_Values = ?,
      Ingredients = ?,
      Preparation = ?,
      DifficultyLevel = ?,
      Taste = ?,
      DrinkType = ?,
      IMG = ?
    WHERE ID_Drink = ?
  `;

    const values = [
        drinkNameInput,
        drinkDescriptionInput,
        drinkHistoryInput,
        drinkNutritionalValues,
        ingredient,
        preparation,
        drinkLevelInput,
        drinkTasteInput,
        drinkTypeInput,
        imageData,
        drinkID,
    ];

    connectionToDrinksDB.query(sql, values, (err, results, fields) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('Error executing query');
            return;
        }

        res.json({ message: 'Drink data updated successfully' });
    });
});



module.exports = router;

