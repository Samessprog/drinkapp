const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userLoginRouter = require('./userLogin');
const userRegister = require('./userRegister');
const userLogout = require('./logout');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

app.use('/api/login', userLoginRouter);
app.use('/api/register', userRegister);
app.use('/api/logout', userLogout)


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



