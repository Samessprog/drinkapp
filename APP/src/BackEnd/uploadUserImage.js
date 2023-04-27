const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('./DB');

const upload = multer();

router.post('/', upload.single('imageData'), async (req, res) => {
    try {
        const imageData = req.file.buffer;
        const result = await db.query('UPDATE users SET user_img = $1 WHERE email = $2', [imageData, 'user1@example.com']);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
