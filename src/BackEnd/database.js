const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const localhost = require('../config/configNode')

const port = 3000;
const app = express();

const corsOptions = {
  origin: `http://${localhost}:3006`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json({ limit: '7mb' }));
app.use(bodyParser.urlencoded({ limit: '7mb', extended: true }));

app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:3006', `http://${localhost}:3006`];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


//Admin
// const deleteUser = require('./Admin/deleteUser')
const acceptDrinksByAdmin = require('./Admin/acceptDrinksByAdmin')
const deleteDrinkByAdmin = require('./Admin/deleteDrink')
// const blockUser = require('./Admin/blockUser')
// const dataUserChangerByAdmin = require('./Admin/userDataChangerAdmin')
const getUnAcceptedDrinks = require('./Admin/getUnAcceptedDrinks')
const getAdminProfileDrinks = require('./Admin/getDrinksByAdmin')
const drinksDataUpdate = require('./Admin/drinkDataUpdate')
//Modal
const userLoginRouter = require('./Modals/userLogin');
const userRegister = require('./Modals/userRegister');
const userLogout = require('./Modals/logout');
const drinkDetails = require('./Drink/getDrinkDetails')
const getAllDrinks = require('./Modals/getAllDrinks')
const fetchDrinkIMG = require('./Modals/getDrinkIMG')
const fetchUserIMG = require('./Modals/getUserIMG')

//User
const userDateChange = require('./User/userDataChange');
const userImgChange = require('./User/uploadUserImage');
const userPasswordChanger = require('./User/userPasswordChange');
const addNewDrink = require('./User/addNewDrink');
const userFavouriteDrinks = require('./User/UserFavouriteDrinks')
const getUserIMG = require('./User/getUserIMG')
const getAllUsers = require('./Admin/getAllUsers')

//Drink
const drinkRating = require('./Drink/drinkRating')
const addToFavouriteDrink = require('./Drink/addToUserFavourite')
//DB
const connectionToDrinksDB = require('./drinksDB')
const db = require('./DB');

//Actions for Users
app.use('/api/login', userLoginRouter);
app.use('/api/register', userRegister);
app.use('/api/logout', userLogout);
app.use('/api/userDataChange', userDateChange);
app.use('/api/userPasswordChange', userPasswordChanger);
app.use('/api/addToUserFavourite', addToFavouriteDrink)
app.use('/api/drinkRating', drinkRating);
//Gety Users
app.get('/api/userIMG', getUserIMG)

//Apps for drinks 
app.use('/api/addNewDrink', addNewDrink);
app.use('/api/uploadImage', userImgChange);

// app.use('/api/deleteUser', deleteUser)
// app.use('/api/blockUser', blockUser)
app.use('/api/deleteDrink', deleteDrinkByAdmin)
app.use('/api/acceptDrinksByAdmin', acceptDrinksByAdmin)
app.use('/api/getAllUsers', getAllUsers)
//Gety Admin
app.get('/api/getAllUsers', getAllUsers)
app.get('/api/getUnAcceptedDrinks', getUnAcceptedDrinks)
app.get('/api/getAdminProfileDrinks', getAdminProfileDrinks)

//Modal gets
app.get('/api/drinkDetails/:id', drinkDetails)
app.get('/api/getAllDrinks', getAllDrinks)
app.get('/api/fetchDrinkIMG/:ID_Drink', fetchDrinkIMG)
app.get('/api/fetchUserIMG/:ID_User', fetchUserIMG)
//DRINKS
app.use('/api/takeFavouriteUserDrink', userFavouriteDrinks)

app.get('/api/session', (req, res) => {
  const sessionId = req.sessionID;
  const user = req.session.user;
  res.json({ sessionId, user });
});
app.post('/api/searchUsers', (req, res) => {
  const { nickName } = req.body;

  db.query('SELECT Nick, Role, userIMG, ID_User FROM users WHERE Nick = ?', [nickName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Wystąpił błąd podczas wyszukiwania użytkownika.' });
    } else {
      if (results.length === 0) {
        res.json({ success: false, message: 'Użytkownik o podanym nickName nie został znaleziony.' });
      } else {
        const user = results[0];
        res.json({ success: true, user });
      }
    }
  });
});

app.get('/api/getPendingFriendRequests/:userID', (req, res) => {
  const userID = req.params.userID;

  const getPendingFriendRequestsQuery = 'SELECT ID_User FROM userfriends WHERE ID_Friend = ? AND Waiting = 1';
  db.query(getPendingFriendRequestsQuery, [userID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Wystąpił błąd podczas pobierania oczekujących zaproszeń do znajomych.' });
    } else {
      if (results.length === 0) {
        res.json({ success: true, message: 'Brak oczekujących zaproszeń do znajomych.', pendingFriendRequests: [] });
      } else {
        const pendingFriendRequestsIDs = results.map(result => result.ID_User);

        // Pobranie danych użytkowników na podstawie ID_User
        const getUsersQuery = 'SELECT Nick, Role, userIMG, ID_User FROM users WHERE ID_User IN (?)';
        db.query(getUsersQuery, [pendingFriendRequestsIDs], (usersErr, usersResults) => {
          if (usersErr) {
            console.error(usersErr);
            res.status(500).json({ success: false, message: 'Wystąpił błąd podczas pobierania danych użytkowników.' });
          } else {
            res.json({ success: true, pendingFriendRequests: usersResults });
          }
        });
      }
    }
  });
});

app.get('/api/getUserFreinds/:userID', (req, res) => {
  const userID = req.params.userID;

  const getFriendRequestsQuery = `
    SELECT ID_Friend, ID_User
    FROM userfriends
    WHERE (ID_User = ? OR ID_Friend = ?) AND Waiting = 0
  `;

  db.query(getFriendRequestsQuery, [userID, userID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Wystąpił błąd podczas pobierania zaproszeń do znajomych.' });
    } else {

      if (results.length === 0) {
        res.json({ success: true, message: 'Brak zaproszeń do znajomych.', pendingFriendRequests: [] });
      } else {
        const friendIDs = results.map(result => {
          if (result.ID_User == userID) {
            return result.ID_Friend !== userID ? result.ID_Friend : null;
          } else {
            return result.ID_User !== userID ? result.ID_User : null;
          }
        }).filter(id => id !== null);

        const getUsersQuery = 'SELECT Nick, Role, userIMG, ID_User FROM users WHERE ID_User IN (?)';
        db.query(getUsersQuery, [friendIDs], (usersErr, usersResults) => {
          if (usersErr) {
            console.error(usersErr);
            res.status(500).json({ success: false, message: 'Wystąpił błąd podczas pobierania danych użytkowników.' });
          } else {
            res.json({ success: true, pendingFriendRequests: usersResults });
          }
        });
      }
    }
  });
});


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

app.get('/api/getOwnDrinks/:userSession', async (req, res) => {
  const userSession = req.params.userSession;

  try {
    const getOwnDrinksQuery = 'SELECT * FROM drink WHERE Creator = ?';
    connectionToDrinksDB.query(getOwnDrinksQuery, [userSession], (error, results) => {
      if (error) {
        console.error('Error fetching user drinks:', error);
        res.status(500).json({ error: 'An error occurred while fetching user drinks.' });
      } else {
        res.status(200).json({ success: true, drinks: results });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }

});


app.get('/api/getAdminProfileDrinks', (req, res) => {
  const sql = 'SELECT ID_DRINK, DrinkName, DifficultyLevel, Creator, Taste, DrinkType, Ingredients, Description, drinkHistory, Drink_Nutritional_Values, Preparation, Rate, user_id FROM drink WHERE Accepted = 1 AND DrinkBlock = 1';
  connectionToDrinksDB.query(sql, (err, results) => {
    if (err) {
      console.error('error executing query: ' + err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});


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

app.use('/api/getUserFavouriteDrinks/:userSession', async (req, res) => {
  const userSession = req.params.userSession;

  try {
    const query = `SELECT DrinkID FROM userfavouritedrink WHERE UserID = ?`;
    db.query(query, [userSession], async (error, results) => {
      if (error) {
        return
      } else {
        const drinkIDs = results.map(result => result.DrinkID);
        const drinksQuery = `SELECT * FROM drink WHERE ID_Drink IN (?)`;
        connectionToDrinksDB.query(drinksQuery, [drinkIDs], (drinksError, drinksResults) => {
          if (drinksError) {
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          } else {
            // Tutaj możesz obsłużyć wyniki zapytania i odpowiedzieć klientowi
            res.json({ success: true, data: drinksResults });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.use('/api/drinksDataUpdate', drinksDataUpdate)


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


