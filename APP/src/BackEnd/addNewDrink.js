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


router.post('/', async (req, res) => {
    const { drinkName, drinkdescription, drinkLevel, drinkTaste, drinkType, userID, userNick } = req.body;


    //przykładowe dane
    const IMG = "https://static.fajnegotowanie.pl/media/uploads/media_image/original/przepis/3626/drink-z-truskawkami.jpg"
    const ING = ""
    const Prep = ""
    const his = ""
 
    try {
        const result = await db.query(`INSERT INTO drink (DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Description, Ingredients, IMG, Preparation, drinkHistory, user_id) VALUES ('${drinkName}', '${drinkLevel}', '${userNick}', '${drinkTaste}', '${drinkType}', '${drinkdescription}', '${ING}', '${IMG}', '${Prep}', '${his}', '${userID}')`);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

});

module.exports = router;
