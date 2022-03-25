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
        <div className="h-full bg-gray-800">
            <div className="h-full grid place-content-center">
                <div className="bg-white rounded-md h-[40em] w-[20em] md:h-[35em] md:w-[40em] relative">
                    <div className="h-[90%] p-3">
                        <ul className="h-full overflow-auto">
                            <Messages messages={messages}/>
                            <div style={{ float:"left", clear: "both" }}
                                ref={lastMessage}>
                            </div>
                        </ul> 
                    </div>
                    <div className="absolute bottom-0 left-0 h-[10%] w-full bg-yellow-400 rounded-md shadow-inner shadow-black">
                        <div className="flex flex-row h-full justify-center">
                            <input type="text" onChange={handleNewMessages} value={newMessage} placeholder="Write the message.." className="grow rounded-bl-md outline-none p-5 border-t border-gray-400"/>
                            <button className="bg-gray-700 rounded-br-md" onClick={handleSendMessage}>
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