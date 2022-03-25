const express = require('express');
const app = express();
const router = express.Router();

const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const SocketIO = require('socket.io');
const MESSAGE_EVENT = "newMessage";

const port = 4000 ;

app.use(cors());

const io = new SocketIO.Server({
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST'],
      credentials: true
    },
  });

io.attach(server);

app.use('/', express.json());

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);  

    // Listen for new messages
    socket.on(MESSAGE_EVENT, (data) => {
        console.log(data)
      io.emit(MESSAGE_EVENT, data);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
    });
  });

server.listen(port , () => {
    console.log(`Server listening to ${port}`);
})