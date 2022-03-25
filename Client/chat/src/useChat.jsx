import {useState, useRef, useEffect} from 'react';

import { io } from "socket.io-client";
const SERVER ="https://realtimechat-serverside.herokuapp.com";

const MESSAGE_EVENT = "newMessage";

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

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
        console.log(messageBody)
        socketRef.current.emit(MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    return {messages, sendMessage}

}

export default useChat;