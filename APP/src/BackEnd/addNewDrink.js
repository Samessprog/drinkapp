const express = require('express');
const router = express.Router();

const multer = require('multer');
const mysql = require('mysql');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drinks'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
});

// Konfiguracja multer
const upload = multer();

// My Regex
const drinkNameRegex = /^[a-zA-Z0-9]{1,15}$/;
const drinkdescriptionRegex = /^[a-zA-Z0-9 ]{30,500}$/;
const drinkHistoryRegex = /^[a-zA-Z0-9 ]{0,500}$/;
const indANDprepRegex = /^[A-Za-z0-9.]+$/;
const drinkLevelAndTasteRegex = /^(Easy|Medium|Hard|Sour|Sweet|Bitter)$/;
const drinkTypeRegex = /^(Alcoholic|Soft)$/;
const validTastesRegex = /^(Sour|Sweet|Bitter)$/;
const nonEmptyRegex = /^.+$/;


router.post('/', upload.single('imageData'), async (req, res) => {

  const {
    userID,
    drinkName,
    drinkdescription,
    drinkLevel,
    drinkTaste,
    drinkType,
    userNick,
    drinkHistory,
  } = req.body;

  const imageData = req.file.buffer;


  const ingredientsOfNewDrink = JSON.parse(req.body.ingredientsOfNewDrink);
  const preparationOfNewDrink = JSON.parse(req.body.preparationOfNewDrink);

  function joinItems(items) {
    return items.map(item => item.text).join('');
  }

  const joinedIngredients = joinItems(ingredientsOfNewDrink);
  const joinedPreparation = joinItems(preparationOfNewDrink);



  if (!drinkName.match(drinkNameRegex)) {
    return res.status(400).json({ error: 'Invalid drink name' });
  }

  if (!drinkdescription.match(drinkdescriptionRegex)) {
    return res.status(400).json({ error: 'Invalid drink description' });
  }

  if (!drinkHistory.match(drinkHistoryRegex)) {
    return res.status(400).json({ error: 'Invalid drink history' });
  }

  if (!drinkLevelAndTasteRegex.test(drinkLevel)) {
    return res.status(400).json({ error: 'Error: Incorrect beverage level. Allowed values ​​ up to Easy, Medium or Hard.y' });
  }

  if (!drinkTypeRegex.test(drinkType)) {
    return res.status(400).json({ error: 'Error: Invalid drinkType. Allowed values ​​are Alcoholic or Soft.' });
  }

  if (!validTastesRegex.test(drinkTaste)) {
    return res.status(400).json({ error: 'Error: Invalid drinkTaste. Allowed values ​​are Sour, Sweet, or Bitter.' });
  }

  if (!nonEmptyRegex.test(joinedIngredients)) {
    return res.status(400).json({ error: 'Error: Ingredients cannot be empty.' });
  }

  if (!nonEmptyRegex.test(joinedPreparation)) {
    return res.status(400).json({ error: 'Error: Preparation cannot be empty..' });
  }



  try {
    const newDrink = await db.query(
      'INSERT INTO drink ( DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Description, Ingredients, IMG, Preparation, drinkHistory, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        drinkName,
        drinkLevel,
        userNick,
        drinkTaste,
        drinkType,
        drinkdescription,
        joinedIngredients,
        imageData,
        joinedPreparation,
        drinkHistory,
        userID,
      ]
    );

    res.status(200).json({ message: 'Drink added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add drink' });
  }
});

module.exports = router;
