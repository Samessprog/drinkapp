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
const drinkLevelAndTasteRegex = /^(?!ALL$).+$/;
const drinkTypeRegex = /^(Alcoholic|Soft)$/;
const drinkHistoryRegex = /^[a-zA-Z0-9 ]{0,500}$/;
const indANDprepRegex = /^[A-Za-z0-9.]+$/;

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
