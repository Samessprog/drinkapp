const express = require('express');
const router = express.Router();
const db = require('./DB')


router.post('/', async (req, res) => {
    const { id, sessionidx } = req.body;

    console.log(id + '|' + sessionidx);

    const query = `UPDATE users SET ID_FavouriteDrink = ${id} WHERE email = '${sessionidx}'`;

    try {
        await db.query(query);
        res.status(200).json({ success: true, message: 'ID added to FavouriteDrink' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
