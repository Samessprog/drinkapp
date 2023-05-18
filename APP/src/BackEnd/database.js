const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

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


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function(req, res, next) {
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


app.use('/api/uploadImage', bodyParser.json({ limit: '50mb' }), bodyParser.urlencoded({ limit: '50mb', extended: true }), userImgChange);

app.get('/api/session', (req, res) => {
  const sessionId = req.sessionID;
  const user = req.session.user;
  console.log(user);
  res.json({ sessionId, user });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
