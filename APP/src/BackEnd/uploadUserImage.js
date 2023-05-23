const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('./DB');

const upload = multer();

router.post('/', upload.single('imageData'), async (req, res) => {
    const { userID } = req.body;

    try {
        // Get the image data from the request body
        const imageData = req.file.buffer;

        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB w bajtach

        if (imageData.byteLength > maxSizeInBytes) {
            res.status(400).json({ message: 'Image size exceeds the limit of 5 MB' });
            return;
        }

        // Save the image in the database
        const sql = 'UPDATE users SET userIMG = ? WHERE ID_User = ?';
        const result = await db.query(sql, [imageData, userID]);
        // Check if the image was successfully saved
        if (result.affectedRows === 1) {
            res.status(200).json({ message: 'Image saved successfully' });
        } else {
            res.status(500).json({ message: 'Failed to save image' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
