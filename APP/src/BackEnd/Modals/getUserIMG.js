
const express = require('express');
const router = express.Router();
const db = require('../DB');

router.get('/api/fetchUserIMG/:ID_User', async (req, res) => {
    const { ID_User } = req.params;
    try {
        const sql = 'SELECT userIMG, IsBlocked  FROM users WHERE ID_User = ?';
        db.query(sql, [ID_User], (err, result) => {
            console.log(result)
            if (err) {
                res.status(500).json({ error: 'Błąd podczas pobierania zdjęcia' });
            } else {
                res.json({ image: result[0].userIMG, IsBlocked: result[0].IsBlocked });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania zdjęcia' });
    }
});

module.exports = router;

