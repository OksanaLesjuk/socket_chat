import http from "node:http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*",
    }

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




server.listen(3000, () => {
    console.log("Server started on port 3000")
})








// варіент з ws
// import { WebSocketServer } from 'ws';

// const server = new WebSocketServer({ port: 3000 });

// const clients = [];
// server.on('connection', (socket) => {
//     console.log("Client connected");

//     clients.push(socket);


//     for (const client of clients) {
//         if (client === socket) {
//             client.send("Welcome to Chat!")
//         } else {
//             client.send("New user connected to Chat")
//         }
//     }
//     socket.onmessage = e => {
//         const data = JSON.parse(e.data);

//         for (const client of clients) {
//             if (client === socket) {
//                 client.send(`You:${data.message} `)
//             } else {
//                 client.send(`${data.name}:${data.message} `)
//             }
//         }
//     }
// });