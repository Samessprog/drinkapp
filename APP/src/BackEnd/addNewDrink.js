const express = require('express');
const router = express.Router();
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


// My Regex
const drinkNameRegex = /^[a-zA-Z0-9]{1,15}$/;
const drinkdescriptionRegex = /^[a-zA-Z0-9 ]{30,500}$/;
const drinkLevelAndTasteRegex = /^(?!ALL$).+$/;
const drinkTypeRegex = /^(Alcoholic|Soft)$/;
const drinkHistoryRegex = /^[a-zA-Z0-9 ]{0,500}$/;

router.post('/', async (req, res) => {
  const { drinkName, drinkdescription, drinkLevel, drinkTaste, drinkType, userID, userNick, drinkHistory, ingredientsOfNewDrink,preparationOfNewDrink } = req.body;



  const joinedIngredients = ingredientsOfNewDrink.reduce(
    (acc, ingredient) => `${acc}${ingredient.text}`,
    ''
  );


  const joinedPreparation= preparationOfNewDrink.reduce(
    (acc, ingredient) => `${acc}${ingredient.text}`,
    ''
  );

 

  // Walidacja pól
  if (!drinkNameRegex.test(drinkName)) {
    res.status(400).send({ error: 'Invalid drink name' });
    return;
  }

  if (!drinkdescriptionRegex.test(drinkdescription)) {
    res.status(400).send({ error: 'Invalid drink description the description should be between 30 and 500 characters' });
    return;
  }

  if (!drinkHistoryRegex.test(drinkHistory)) {
    res.status(400).send({ error: 'Invalid drink history the description should be maximum 500 characters' });
    return;
  }


  if (drinkTaste === 'All' && drinkLevel === 'All') {
    res.status(400).send({ error: 'Invalid drink level or taste' });
    return;
  }

  if (!drinkTypeRegex.test(drinkType)) {
    res.status(400).send({ error: 'Invalid drink type' });
    return;
  }

  // Przykładowe dane
  const IMG = 'https://static.fajnegotowanie.pl/media/uploads/media_image/original/przepis/3626/drink-z-truskawkami.jpg';




  try {
    const result = await db.query(`INSERT INTO drink (DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Description, Ingredients, IMG, Preparation, drinkHistory, user_id) VALUES ('${drinkName}', '${drinkLevel}', '${userNick}', '${drinkTaste}', '${drinkType}', '${drinkdescription}', '${joinedIngredients}', '${IMG}', '${joinedPreparation}', '${drinkHistory}', '${userID}')`);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

});

module.exports = router;
