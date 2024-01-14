const http = require('http');
const socketIo = require('socket.io');
express = require("express")
const localhost = require('../config/configNode');
const db = require('./DB');

const port = 4003;

const server = http.createServer();

const io = socketIo(server, {
    cors: {
        origin: `http://${localhost}:3006`,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.on("addFriend", (userData) => {
        const { friendID, userID } = userData;
        const checkIfExistsQuery = 'SELECT * FROM userfriends WHERE (ID_User = ? AND ID_Friend = ?) OR (ID_User = ? AND ID_Friend = ?)';
        db.query(checkIfExistsQuery, [userID, friendID, friendID, userID], (checkErr, checkResult) => {
            if (checkErr) {
                console.error(checkErr);
                socket.emit('addFriendError', 'Wystąpił błąd podczas sprawdzania relacji przyjaźni.');
            } else {
                if (checkResult.length > 0) {
                    socket.emit('addFriendError', 'Relacja przyjaźni już istnieje.');
                } else {
                    const insertFriendshipQuery = 'INSERT INTO userfriends (ID_User, ID_Friend, Waiting) VALUES (?, ?, 1)';
                    db.query(insertFriendshipQuery, [userID, friendID], (insertErr) => {
                        if (insertErr) {
                            console.error(insertErr);
                        }
                    });
                }
            }
        });
    });

    socket.on("confirmFriend", data => {
        const { ID_User, userSesion } = data;
        const updateFriendshipQuery = 'UPDATE userfriends SET Waiting = 0 WHERE ID_User = ? AND ID_Friend = ?';
        db.query(updateFriendshipQuery, [ID_User, userSesion], (err, result) => {
            if (err) {
                console.error(err);
                socket.emit('confirmFriendError', 'Wystąpił błąd podczas potwierdzania przyjaźni.');
            } else {
                socket.emit('confirmFriendSuccess', 'Przyjaźń została pomyślnie potwierdzona.');
            }
        });
    });

    socket.on("deleteFriend", data => {
        const { ID_User, userSesion } = data;

        const deleteFriendshipQuery = 'DELETE FROM userfriends WHERE ID_User = ? AND ID_Friend = ?';
        db.query(deleteFriendshipQuery, [ID_User, userSesion], (err, result) => {
            if (err) {
                console.error(err);
                socket.emit('deleteFriendError', 'Wystąpił błąd podczas usuwania przyjaciela.');
            } else {
                if (result.affectedRows >= 0) {
                    socket.emit('deleteFriendSuccess', 'Przyjaciel został pomyślnie usunięty.');
                } else {
                    socket.emit('deleteFriendError', 'Nie znaleziono przyjaciela do usunięcia.');
                }
            }
        });
    });
})

server.listen(4003, () => {
    console.log("ServerRunning")
})






































