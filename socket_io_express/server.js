import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import path from "node:path";



const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "socket_io_express/index.html"));
});


io.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit("chatMessage", "Welcome to Chat!");
    socket.broadcast.emit("chatMessage", 'New user connected to Chat');
    socket.on('chatMessage', (message) => {
        const data = JSON.parse(message);
        socket.emit("chatMessage", `You:${data.message}`);
        socket.broadcast.emit("chatMessage", `${data.name}: ${data.message} `)
    })
})

server.listen(8080, () => {
    console.log("Server started on port 8080");

})