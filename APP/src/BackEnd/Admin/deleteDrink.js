const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB')

router.post('/api/deleteDrink', async (req, res) => {
    const { ID_Drink } = req.body;

    if (!ID_Drink) {
        res.status(400).json({ error: 'ID_Drink is required' });
        return;
    }

    connectionToDrinksDB.query('DELETE FROM drink WHERE ID_Drink = ?', ID_Drink, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Drink deleted successfully' });
        } else {
            res.status(404).json({ error: 'Drink not found' });
        }
    });
});

module.exports = router;
