import React, {useState, useRef, useEffect} from 'react';
import { FiSend } from "react-icons/fi";
import Messages from '../messages/Messages'

import useChat from "../../useChat";

const ChatRoom = () => {
    const { messages, sendMessage } = useChat();
    const [newMessage, setNewMessage] = useState("");

    const lastMessage = useRef(null);   

    const handleNewMessages = (e) => {
        setNewMessage(e.target.value)
    }

    const handleEnterMessage = (e) =>{
        if(e.key === 'Enter'){
            handleSendMessage();
        }
    }

    const handleSendMessage = () =>{
        if(newMessage === '' || newMessage === undefined){
            setNewMessage("");
        }else{
            sendMessage(newMessage);
            setNewMessage("");
        }
    }

    const scrollToBottom = () => {
        lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() =>{
        scrollToBottom();
    }, [messages]);

    return(
        <div className="h-full bg-zinc-700 overflow-hidden">
            <div className=" hidden md:block md:absolute md:top-1/2 md:left-3">
                <p className="text-center text-white">Made by Marcos Iorio</p>
                <p className="text-center text-white">Repository: <a href="https://github.com/Marcos-Iorio/realtime-chat" target="_blank">GITHUB</a></p>
            </div>
            <div className="h-full grid place-content-center">
                <div className="bg-white rounded-md h-[40em] w-[20em] md:h-[35em] md:w-[40em] relative shadow-2xl">
                    <div className="h-[90%] p-3">
                        <ul className="h-full overflow-auto">
                            <Messages messages={messages}/>
                            <div style={{ float:"left", clear: "both" }}
                                ref={lastMessage}>
                            </div>
                        </ul> 
                    </div>
                    <div className="absolute bottom-0 left-0 h-[10%] w-full">
                        <div className="flex flex-row h-full items-center">
                            <input type="text" onChange={handleNewMessages} onKeyUp={handleEnterMessage} value={newMessage} placeholder="Write the message.." className="grow rounded-md outline-none p-2 m-2 border border-gray-400"/>
                            <button className="bg-gray-700 rounded-md m-2 p-2" onClick={handleSendMessage}>
                                <div className="w-20 flex justify-center items-center ">
                                    <FiSend className="text-2xl text-white"></FiSend>
                                </div>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;