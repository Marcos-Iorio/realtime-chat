# Real time chat app

A real time chat webapp with React, Express, Socket.io and Nodemon.
The styles of the app are made with **Tailwind** and is responsive on mobile and desktop

# Demo

You can use the app here https://realtime-chat-marcos-iorio.vercel.app/.

## Usage

To use the app put in the console **git clone https://github.com/Marcos-Iorio/realtime-chat.git**

## Client
Run **npm install**

Run **cd ./chat/** and then **npm start**. Go to http://localhost:3000 to view the app in the browser.

## Server
Run **npm install**
Run **npm start** or **node index.js**. Then go to http://localhost:4000 to view the server(is not required to open it)

## About
Right now the app is running in Heroku and Vercel, if you want to run it locally, you have to change the SERVER variable in the ChatRoom.jsx to http://localhost:4000. The main approach of this project is to learn Socket.io and practising React, in this case i practice a lot of useRef, and i improve my css skills.

## Future updates

- Press enter to send a message.
- View when the message was sent.
- Save all the messages on a DB
- Add login with Github
- Improve the users id.
