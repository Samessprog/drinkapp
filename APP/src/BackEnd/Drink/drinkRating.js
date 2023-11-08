const express = require('express');
const router = express.Router();
const connectionToDrinksDB = require('../drinksDB');

router.post('/api/drinkRating', async (req, res) => {
    const { ID_DRINK, clickedStar, userID } = req.body;
    // Check if the user has already rated this drink
    const checkQuery = "SELECT * FROM drinksrating WHERE User_ID = ? AND Drink_ID = ?";
    connectionToDrinksDB.query(checkQuery, [userID, ID_DRINK], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Błąd przy sprawdzaniu oceny drinku:", checkErr);
            res.status(500).send("Wystąpił błąd podczas sprawdzania oceny drinku.");
        } else {
            if (checkResult.length > 0) {
                // The user has already rated this drink, so update the existing rating
                const updateQuery = "UPDATE drinksrating SET Rate = ? WHERE User_ID = ? AND Drink_ID = ?";
                connectionToDrinksDB.query(updateQuery, [clickedStar, userID, ID_DRINK], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error("Błąd przy aktualizowaniu oceny drinku:", updateErr);
                        res.status(500).send("Wystąpił błąd podczas aktualizacji oceny drinku.");
                    } else {
                        console.log("Ocena drinku została zaktualizowana.");

                        // Calculate the average rating for the drink
                        const averageQuery = "SELECT AVG(Rate) AS AverageRating FROM drinksrating WHERE Drink_ID = ?";
                        connectionToDrinksDB.query(averageQuery, [ID_DRINK], (averageErr, averageResult) => {
                            if (averageErr) {
                                console.error("Błąd przy obliczaniu średniej oceny drinku:", averageErr);
                            } else {
                                const averageRating = averageResult[0].AverageRating;
                                console.log(`Średnia ocena dla drinku (Drink ID: ${ID_DRINK}): ${averageRating}`);

                                // Update the "drink" table with the calculated average rating
                                const updateDrinkTableQuery = "UPDATE drink SET Rate = ? WHERE ID_Drink = ?";
                                connectionToDrinksDB.query(updateDrinkTableQuery, [averageRating, ID_DRINK], (updateDrinkErr, updateDrinkResult) => {
                                    if (updateDrinkErr) {
                                        console.error("Błąd przy aktualizacji tabeli drink:", updateDrinkErr);
                                    } else {
                                        console.log(`Tabela drink została zaktualizowana z nową oceną (Drink ID: ${ID_DRINK}): ${averageRating}`);
                                    }
                                });
                            }
                        });

                        res.status(200).send("Ocena drinku została zaktualizowana.");
                    }
                });
            } else {
                // The user has not rated this drink before, insert a new rating
                const insertQuery = "INSERT INTO drinksrating (User_ID, Drink_ID, Rate) VALUES (?, ?, ?)";
                connectionToDrinksDB.query(insertQuery, [userID, ID_DRINK, clickedStar], (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Błąd przy wstawianiu oceny drinku:", insertErr);
                        res.status(500).send("Wystąpił błąd podczas oceniania drinku.");
                    } else {
                        console.log("Ocena drinku została pomyślnie dodana.");

                        // Calculate the average rating for the drink
                        const averageQuery = "SELECT AVG(Rate) AS AverageRating FROM drinksrating WHERE Drink_ID = ?";
                        connectionToDrinksDB.query(averageQuery, [ID_DRINK], (averageErr, averageResult) => {
                            if (averageErr) {
                                console.error("Błąd przy obliczaniu średniej oceny drinku:", averageErr);
                            } else {
                                const averageRating = averageResult[0].AverageRating;
                                console.log(`Średnia ocena dla drinku (Drink ID: ${ID_DRINK}): ${averageRating}`);

                                // Update the "drink" table with the calculated average rating
                                const updateDrinkTableQuery = "UPDATE drink SET Rate = ? WHERE ID_Drink = ?";
                                connectionToDrinksDB.query(updateDrinkTableQuery, [averageRating, ID_DRINK], (updateDrinkErr, updateDrinkResult) => {
                                    if (updateDrinkErr) {
                                        console.error("Błąd przy aktualizacji tabeli drink:", updateDrinkErr);
                                    } else {
                                        console.log(`Tabela drink została zaktualizowana z nową oceną (Drink ID: ${ID_DRINK}): ${averageRating}`);
                                    }
                                });
                            }
                        });
                        res.status(200).send("Ocena drinku została dodana.");
                    }
                });
            }
        }
    });
});

module.exports = router;
