// const express = require('express');
// const router = express.Router();
// const db = require('./DB');

// router.post('/', async (req, res) => {
//   const { id, sessionidx } = req.body;

//   if (!sessionidx) {
//     return res.status(400).json({ success: false, message: 'Missing sessionidx' });
//   }

//   try {
//     const querySelect = `SELECT ID_FavouriteDrink FROM users WHERE email = '${sessionidx}'`;
//     const result = await db.query(querySelect);

//     let currentFavouriteDrinks = [];
//     if (result.length > 0) {
//       currentFavouriteDrinks = JSON.parse(result[0].ID_FavouriteDrink);
//     }

//     currentFavouriteDrinks.push(id);

//     const updatedFavouriteDrinks = JSON.stringify(currentFavouriteDrinks);

//     const queryUpdate = `UPDATE users SET ID_FavouriteDrink = '${updatedFavouriteDrinks}' WHERE email = '${sessionidx}'`;
//     await db.query(queryUpdate);

//     res.status(200).json({
//       success: true,
//       message: 'ID added to FavouriteDrink',
//       updatedFavouriteDrinks: currentFavouriteDrinks,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'An error occurred' });
//   }
// });

// module.exports = router;
