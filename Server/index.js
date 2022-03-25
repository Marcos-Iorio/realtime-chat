const express = require('express');
const app = express();
const router = express.Router();

const http = require('https');
const server = http.createServer(app);
const cors = require('cors');

const SocketIO = require('socket.io');
const MESSAGE_EVENT = "newMessage";

const port = process.env.PORT || 5000 ;

app.use(cors());

const io = new SocketIO.Server({
    cors: {
      origin: "*",
      methods: ['GET', 'POST'],
      allowedHeaders: ['X-ACCESS_TOKEN', 'Access-Control-Allow-Origin', 'Authorization', 'Origin', 'x-requested-with', 'Content-Type', 'Content-Range', 'Content-Disposition', 'Content-Description']
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