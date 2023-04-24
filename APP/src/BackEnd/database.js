const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const userLoginRouter = require('./userLogin');
const userRegister = require('./userRegister');
const userLogout = require('./logout');

const port = 3000;

const app = express();

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use(cors());

app.use('/api/login', userLoginRouter);
app.use('/api/register', userRegister);
app.use('/api/logout', userLogout)

app.get('/api/session', (req, res) => {
  const sessionId = req.sessionID;
  const user = req.session.user;
  res.json({ sessionId, user });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



