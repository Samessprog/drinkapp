const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

//Admin
const deleteUser = require('./Admin/deleteUser')
const acceptDrinksByAdmin = require('./Admin/acceptDrinksByAdmin')
const deleteDrink = require('./Admin/deleteDrink')
const blockUser = require('./Admin/blockUser')
const dataUserChangerByAdmin = require('./Admin/userDataChangerAdmin')

//Modal
const userLoginRouter = require('./Modals/userLogin');
const userRegister = require('./Modals/userRegister');
const userLogout = require('./Modals/logout');
const removeFromUserFavourite = require('./Modals/removeFromUserFavourite')
//User
const userDateChange = require('./User/userDataChange');
const userImgChange = require('./User/uploadUserImage');
const userPasswordChanger = require('./User/userPasswordChange');
const addNewDrink = require('./User/addNewDrink');
const userFavouriteDrinks = require('./User/UserFavouriteDrinks')

//Drink
const drinkRating = require('./Drink/drinkRating')
const addToFavouriteDrink = require('./Drink/addToUserFavourite')
//DB
const connectionToDrinksDB = require('./drinksDB')
const db = require('./DB');


const port = 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3006',
  methods: ["GET", "POST", "REQUEST"],
  credentials: true
}));


app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json({ limit: '7mb' }));
app.use(bodyParser.urlencoded({ limit: '7mb', extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3006');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//Actions for Users
app.use('/api/login', userLoginRouter);
app.use('/api/register', userRegister);
app.use('/api/logout', userLogout);
app.use('/api/userDataChange', userDateChange);
app.use('/api/userPasswordChange', userPasswordChanger);
app.use('/api/addToUserFavourite', addToFavouriteDrink)
app.use('/api/removeFromUserFavourite', removeFromUserFavourite)
app.use('/api/drinkRating', drinkRating);

//Apps for drinks 
app.use('/api/addNewDrink', addNewDrink);
app.use('/api/uploadImage', userImgChange);

//Admin Actions
app.use('/api/userDataChangerADMIN', dataUserChangerByAdmin)
app.use('/api/deleteUser', deleteUser)
app.post('/api/blockUser', blockUser)
app.use('/api/deleteDrink', deleteDrink)
app.use('/api/acceptDrinksByAdmin', acceptDrinksByAdmin)

//DRINKS
app.use('/api/takeFavouriteUserDrink', userFavouriteDrinks)

app.get('/api/session', (req, res) => {
  const sessionId = req.sessionID;

  const user = req.session.user;

  res.json({ sessionId, user });
});

app.get('/api/userIMG', (req, res) => {

  const email = req.session.email;

  db.query('SELECT userIMG FROM users WHERE email = ?', email, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      const userIMGBuffer = results[0].userIMG;
      res.type('image/png');
      res.send(userIMGBuffer);
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  });
});

app.get('/api/getAllUsers', (req, res) => {
  db.query('SELECT ID_User, email, Password, phone, Nick, IsBlocked  FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results); // Wyślij dane użytkowników do frontendu w formacie JSON
    } else {
      res.status(404).json({ error: 'No users found' });
    }
  });
});

const multer = require('multer');
const upload = multer();

app.post('/api/drinksDataUpdate', upload.single('drinkImg'), async (req, res) => {
  const { drinkID, drinkNameInput, drinkDescriptionInput, drinkHistoryInput, ing, prep, drinkLevelInput, drinkTasteInput, drinkTypeInput } = req.body;

  const ingredient = ing.replace(/,/g, '.');
  const preparation = prep.replace(/,/g, '.');

  const imageData = req.file.buffer;

  const sql = `
  UPDATE drink
  SET 
    DrinkName = ?,
    Description = ?,
    drinkHistory = ?,
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

app.get('/api/getUnAcceptedDrinks', async (req, res) => {
  const sql = 'SELECT ID_DRINK, DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Description, Ingredients, Preparation, drinkHistory, Rate, user_id, Date_Of_Creation FROM drink WHERE Accepted = 0';
  connectionToDrinksDB.query(sql, (err, results, fields) => {
    if (err) {
      console.error('error executing query: ' + err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});


app.get('/api/drinkDetails/:id', async (req, res) => {
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


app.get('/api/getAdminProfileDrinks', async (req, res) => {
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

app.get('/api/getAllDrinks', async (req, res) => {
  const sql = 'SELECT ID_DRINK, DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Description, Ingredients, Preparation, drinkHistory, Rate, user_id FROM drink';
  connectionToDrinksDB.query(sql, (err, results, fields) => {
    if (err) {
      console.error('error executing query: ' + err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/api/fetchDrinkIMG/:ID_Drink', async (req, res) => {
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
});

app.get('/api/fetchUserIMG/:ID_User', async (req, res) => {
  const { ID_User } = req.params;
  try {
    const sql = 'SELECT userIMG, IsBlocked  FROM users WHERE ID_User = ?';
    db.query(sql, [ID_User], (err, result) => {
      console.log(result)
      if (err) {
        res.status(500).json({ error: 'Błąd podczas pobierania zdjęcia' });
      } else {
        res.json({ image: result[0].userIMG, IsBlocked: result[0].IsBlocked });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania zdjęcia' });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


