
const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB')

router.post('/', async (req, res) => {
    const { drinkID } = req.body;

    const sql = 'UPDATE drink SET Accepted = 1 WHERE ID_Drink = ?';

    connectionToDrinksDB.query(sql, [drinkID], (err, results, fields) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error executing query');
            return;
        }

        // Jeśli zaktualizowano pomyślnie, możesz odpowiedzieć sukcesem
        res.json({ message: 'Drink has been accepted successfully' });
    });
});


module.exports = router;
