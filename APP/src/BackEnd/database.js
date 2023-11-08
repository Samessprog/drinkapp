const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

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

//Admin
const deleteUser = require('./Admin/deleteUser')
const acceptDrinksByAdmin = require('./Admin/acceptDrinksByAdmin')
const deleteDrink = require('./Admin/deleteDrink')
const blockUser = require('./Admin/blockUser')
const dataUserChangerByAdmin = require('./Admin/userDataChangerAdmin')
const getUnAcceptedDrinks = require('./Admin/getUnAcceptedDrinks')
const getAdminProfileDrinks = require('./Admin/getDrinksByAdmin')
const drinksDataUpdate = require('./Admin/drinkDataUpdate')
//Modal
const userLoginRouter = require('./Modals/userLogin');
const userRegister = require('./Modals/userRegister');
const userLogout = require('./Modals/logout');
const removeFromUserFavourite = require('./Modals/removeFromUserFavourite')
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
app.use('/api/removeFromUserFavourite', removeFromUserFavourite)
app.use('/api/drinkRating', drinkRating);
//Gety Users
app.get('/api/userIMG', getUserIMG)

//Apps for drinks 
app.use('/api/addNewDrink', addNewDrink);
app.use('/api/uploadImage', userImgChange);

//Admin Actions
app.use('/api/userDataChangerADMIN', dataUserChangerByAdmin)
app.use('/api/deleteUser', deleteUser)
app.use('/api/blockUser', blockUser)
app.use('/api/deleteDrink', deleteDrink)
app.use('/api/acceptDrinksByAdmin', acceptDrinksByAdmin)
app.use('/api/getAllUsers', getAllUsers)
//Gety Admin
app.get('/api/getAllUsers', getAllUsers)
app.get('/api/getUnAcceptedDrinks', getUnAcceptedDrinks)
app.get('/api/getAdminProfileDrinks',  getAdminProfileDrinks)

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


const multer = require('multer');
const upload = multer();

app.use('/api/drinksDataUpdate', drinksDataUpdate )



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


