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
const addFavouriteDrink = require('./addFavouriteDrink');

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

// Endpoint dla żądania POST
app.post('/api/addToUserFavourite', async (req, res) => {
  // Kod obsługi żądania POST
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


// add to favorite user drinks
app.get('/api/TakeUserFavourite', async (req, res) => {
  const email = req.session.email;
  console.log(email);

  db.query('SELECT ID_FavouriteDrink FROM users WHERE email = ?', email, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      const userIMGBuffer = results[0].ID_FavouriteDrink;
      console.log(userIMGBuffer)
     
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  });

});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
