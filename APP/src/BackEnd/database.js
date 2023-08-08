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

//Apps for drinks 
app.use('/api/addNewDrink', addNewDrink);
app.use('/api/uploadImage', userImgChange);


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

app.use('/api/addToUserFavourite', async (req, res) => {
  const { id, sessionidx } = req.body;

  const checkQuery = `SELECT * FROM userfavouritedrink WHERE UserID = ? AND DrinkID = ?`;
  db.query(checkQuery, [sessionidx, id], (checkError, checkResults) => {
    if (checkError) {
      console.error(checkError);
      res.status(500).json({ message: 'Error checking user favorites.' });
    } else {
      if (checkResults.length > 0) {
        const deleteQuery = `DELETE FROM userfavouritedrink WHERE UserID = ? AND DrinkID = ?`;
        db.query(deleteQuery, [sessionidx, id], (deleteError) => {
          if (deleteError) {
            console.error(deleteError);
            res.status(500).json({ message: 'Error removing drink from user favorites.' });
          } else {
            res.status(200).json({ message: 'Drink removed from user favorites.' });
          }
        });
      } else {
        const insertQuery = `INSERT INTO userfavouritedrink (UserID, DrinkID) VALUES (?, ?)`;
        db.query(insertQuery, [sessionidx, id], (insertError) => {
          if (insertError) {
            console.error(insertError);
            res.status(500).json({ message: 'Error adding drink to user favorites.' });
          } else {
            res.status(200).json({ message: 'Drink added to user favorites successfully.' });
          }
        });
      }
    }
  });
});

app.post('/api/userDataChangerADMIN', async (req, res) => {
  const { newUserEmail, newUserPass, userID } = req.body;

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!passwordRegex.test(newUserPass)) {
    res.status(400).json({ success: false, message: 'Invalid password' });
    return;
  }

  if (!emailRegex.test(newUserEmail)) {
    res.status(400).json({ success: false, message: 'Invalid email' });
    return;
  }

  try {
    // Aktualizacja adresu e-mail i hasła użytkownika w bazie danych
    db.query(
      'UPDATE users SET email = ?, password = ? WHERE ID_User = ?',
      [newUserEmail, newUserPass, userID],
      (err, result) => {
        if (err) {
          res.status(500).json({ success: false, message: 'Failed to update user data' });
          return;
        }

        res.json({ success: true });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
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

app.get('/api/getAllUsers', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


