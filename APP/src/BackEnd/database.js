const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const db = require('./DB');
const userLoginRouter = require('./userLogin');
const userRegister = require('./userRegister');
const userLogout = require('./logout');
const userDateChange = require('./userDataChange');
const userImgChange = require('./uploadUserImage');
const userPasswordChanger = require('./userPasswordChange');
const addNewDrink = require('./addNewDrink');
const addToFavouriteDrink = require('./addToUserFavourite')
const dataUserChangerByAdmin = require('./userDataChangerAdmin')

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

//Apps for drinks 
app.use('/api/addNewDrink', addNewDrink);
app.use('/api/uploadImage', userImgChange);

//Admin 
app.use('/api/userDataChangerADMIN', dataUserChangerByAdmin)

app.post('/api/removeFromUserFavourite', async (req, res) => {
  const { drinkID, userID } = req.body;

  const deleteQuery = 'DELETE FROM userfavouritedrink WHERE userID = ? AND drinkID = ?';

  db.query(deleteQuery, [userID, drinkID], (error, results) => {
    if (error) {
      console.error('Error deleting favorite:', error);
      res.status(500).json({ error: 'An error occurred while deleting the favorite.' });
    }
  });
});



app.post('/api/deleteUser', async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    res.status(400).json({ error: 'userID is required' });
    return;
  }

  db.query('DELETE FROM users WHERE ID_User = ?', userID, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

app.post('/api/blockUser', async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    res.status(400).json({ error: 'userID is required' });
    return;
  }

  // Pobierz aktualną wartość boolean z bazy danych (1 lub 0)
  db.query('SELECT IsBlocked FROM users WHERE ID_User = ?', userID, (err, results) => {
    console.log(results)

    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentBlockedValue = results[0].IsBlocked; // Pobierz aktualną wartość boolean

    // Zmień wartość boolean na przeciwną
    const newBlockedValue = currentBlockedValue === 1 ? 0 : 1;

    // Zaktualizuj wartość boolean w bazie danych
    db.query('UPDATE users SET IsBlocked = ? WHERE ID_User = ?', [newBlockedValue, userID], (err, updateResults) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(200).json({ message: 'User blocked status updated successfully' });
    });
  });
});


//Gets 
app.get('/api/takeFavouriteUserDrink', async (req, res) => {
  const userIDs = req.session.user?.userID;

  // Fetch the DrinkIDs for the given UserID
  const query = `SELECT DrinkID FROM userfavouritedrink WHERE UserID = ?`;

  db.query(query, [userIDs], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user favorite drinks.' });
    } else {
      // Extract the DrinkID values from the query results
      const drinkIDs = results.map((row) => row.DrinkID);
      res.status(200).json({ drinkIDs });
    }
  });
});

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
  db.query('SELECT ID_User, email, Password, phone, Nick FROM users', (err, results) => {
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

const mysql = require('mysql');

const connectionToDrinksDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drinks'
});


app.post('/api/deleteDrink', async (req, res) => {
  const { ID_Drink } = req.body;
  console.log(ID_Drink)

  if (!ID_Drink) {
    res.status(400).json({ error: 'ID_Drink is required' });
    return;
  }

  connectionToDrinksDB.query('DELETE FROM drink WHERE ID_Drink = ?', ID_Drink, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Drink deleted successfully' });
    } else {
      res.status(404).json({ error: 'Drink not found' });
    }
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


