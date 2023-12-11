const http = require('http');
const socketIo = require('socket.io');
const userDB = require('./DB')
const drinkDB = require('./drinksDB')
express = require("express")
const localhost = require('../config/configNode')

const port = 4002;

const server = http.createServer();
const io = socketIo(server, {
    cors: {
        origin: `http://${localhost}:3006`, 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.on('userDataChanger', ({ newUserEmail, ID_User, newUserNick, newUserPhone, userRole }, res) => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(newUserEmail)) {
            io.emit('userDataChangerResponse', { success: false, error: 'Invalid email' });
            return;
        }
        try {
            userDB.query(
                'UPDATE users SET email = ?, phone = ?, Nick = ?, Role = ? WHERE ID_User = ?',
                [newUserEmail, newUserPhone, newUserNick, userRole, ID_User],
                (err, result) => {
                    if (err) {
                        io.emit('userDataChangerResponse', { success: false, error: 'Failed to update user data' });
                        return;
                    }

                    io.emit('userDataChangerResponse', { success: true });
                }
            );
        } catch (error) {
            io.emit('userDataChangerResponse', { success: false, error: 'An error occurred' });
        }
    });

    socket.on('deleteDrink', ({ ID_Drink }) => {
        if (!ID_Drink) {
            io.emit('deleteDrinkResponse', { success: false, error: 'ID_Drink is required' });
            return;
        }

        drinkDB.query('DELETE FROM drink WHERE ID_Drink = ?', ID_Drink, (err, results) => {
            if (err) {
                console.error(err);
                io.emit('deleteDrinkResponse', { success: false, error: 'Internal Server Error' });
                return;
            }

            if (results.affectedRows > 0) {
                io.emit('deleteDrinkResponse', { success: true, ID_Drink: ID_Drink, message: 'Drink deleted successfully' });
            } else {
                io.emit('deleteDrinkResponse', { success: false, error: 'Drink not found' });
            }
        });
    });

    socket.on('deleteUser', ({ userID }) => {
        if (!userID) {
            socket.emit('deleteUserResponse', { success: false, error: 'userID is required' });
            return;
        }

        userDB.query('DELETE FROM users WHERE ID_User = ?', userID, (err, results) => {
            if (err) {
                console.error(err);
                socket.emit('deleteUserResponse', { success: false, error: 'Internal Server Error' });
                return;
            }

            if (results.affectedRows > 0) {
                io.emit('deleteUserResponse', { success: true, userID: userID, message: 'User deleted successfully' });
            } else {
                socket.emit('deleteUserResponse', { success: false, error: 'User not found' });
            }
        });
    });

    socket.on('blockUser', ({ userID }) => {
        console.log(userID);
        userDB.query('SELECT IsBlocked FROM users WHERE ID_User = ?', userID, (err, results) => {
            if (err) {
                console.error(err);
                socket.emit('blockUserResponse', { success: false, error: 'Internal Server Error' });
                return;
            }

            if (!results || results.length === 0) {
                socket.emit('blockUserResponse', { success: false, error: 'User not found' });
                return;
            }

            const currentBlockedValue = results[0].IsBlocked;
            const newBlockedValue = currentBlockedValue === 1 ? 0 : 1;
            userDB.query('UPDATE users SET IsBlocked = ? WHERE ID_User = ?', [newBlockedValue, userID], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError);
                    socket.emit('blockUserResponse', { success: false, error: 'Error updating user blocked status' });
                    return;
                }
                socket.emit('blockUserResponse', { success: true, userID: userID, message: 'User blocked successfully' });
            });
        });
    });
});

server.listen(port, () => {
    console.log(`Test server listening at http://localhost:${port}`);
});
