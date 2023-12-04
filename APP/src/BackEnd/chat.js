const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")

const { Server } = require("socket.io")

app.unsubscribe(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3006",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`user Connected ${socket.id}`)

    socket.on("joinChatRoom", (chatID) => {
        socket.join(chatID)
        console.log(`User with ID: ${socket.id}  AND  ${chatID}`)

    })

    socket.on("sendMessage", (data) => {
        io.to(data.chat).emit("receiveMessage", data)
    })

    socket.on("disconnect", () => {
        console.log("disconnecteeed", socket.id)
    })

})


server.listen(4001, () => {
    console.log("ServerRunning")
})