const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userLoginRouter = require('./userLogin');
const userRegister = require('./userRegister');
;

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

app.use('/api/login', userLoginRouter);
app.use('/api/register', userRegister);



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



