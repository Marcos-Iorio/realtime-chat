const express = require('express');
const app = express();
const router = express.Router();

const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const mongoose = require('mongoose');

const SocketIO = require('socket.io');
const MESSAGE_EVENT = "newMessage";

const port = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

require('dotenv').config()

//mongo connect
mongoose.connect(/* 'mongodb://localhost:27017/messages' */URI);
const conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});

const messageSchema = new mongoose.Schema({
  
  senderId: {
    type: String
  },
  body: {
    type: String
  },
  timeStamp: {
    type: String
  }

})

const messageModel = mongoose.model('message', messageSchema);

//cors
app.use(cors());

const io = new SocketIO.Server({
    cors: {
      origin: "*",
      methods: ['GET', 'POST'],
      allowedHeaders: ['X-ACCESS_TOKEN', 'Access-Control-Allow-Origin', 'Authorization', 'Origin', 'x-requested-with', 'Content-Type', 'Content-Range', 'Content-Disposition', 'Content-Description'],
      transports: ['websocket']
    },
  });

io.attach(server);

app.use('/', express.json());

app.get('/', (req, res) => {
  messageModel.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

});

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);  

    // Listen for new messages
    socket.on(MESSAGE_EVENT, (data) => {
      io.emit(MESSAGE_EVENT, data);

      //save de incomming messages in the DB
      const message = new messageModel({
        senderId : data.senderId,
        body: data.body,
        timeStamp: data.timeStamp,
      });

      message.save().then(item => console.log(''));
    });

   /*  pass: Cd0Jx2h1ajh5hJwk */
 
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
    });
  });

server.listen(port , () => {
    console.log(`Server listening to ${port}`);
})