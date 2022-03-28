import React from 'react'

const Messages = (props) => {
    return(
        <>
            {props.messages.map((message, i) =>{
              return( 
                <li key={i}  className={message.isYou ? 'bg-green-300 relative w-1/2 ml-auto m-2 p-2 rounded-md' : 'bg-gray-300 w-1/2 mr-auto relative m-2 p-2 rounded-md'}>
                    <div className={message.isYou ? "w-0 h-0 border-t-[10px] border-l-[15px] border-b-[10px] border-l-green-300 absolute -right-[8px] border-t-transparent border-b-transparent" : "w-0 h-0 border-t-[10px] border-r-[15px] border-b-[10px] border-r-gray-300 border-t-transparent border-b-transparent absolute -left-[8px] rounded-md"}></div>
                    <div className="flex flex-col">
                        <div className="font-bold text-black break-words">{message.senderId}</div>
                        <div className="text-lg break-words">{message.body}</div>
                    </div>
                    <div className="absolute right-2 bottom-1 text-black/60 text-sm">{message.timeStamp}</div>
                </li>
                
                );
            })}
        </>
    );
}

export default Messages;