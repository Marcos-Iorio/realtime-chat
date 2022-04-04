import {useState, useRef, useEffect} from 'react';

import { io } from "socket.io-client";
const SERVER ="https://realtimechat-serverside.herokuapp.com" /* "http://localhost:5000/" */;

const MESSAGE_EVENT = "newMessage";

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    const date = new Date();

    const getMessages = async () =>{
        const response = await fetch("https://realtimechat-serverside.herokuapp.com/");
        const data = await response.json();
        setMessages(data);
    }
    
    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() =>{
        socketRef.current = io(SERVER);

        socketRef.current.on(MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                isYou: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
            
        })

        return() =>{
            socketRef.current.disconnect();
        }
    }, []);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            timeStamp: `${date.getHours()}:${date.getMinutes()}`
        });
    };

    return {messages, sendMessage}

}

export default useChat;