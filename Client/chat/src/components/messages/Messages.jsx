import React from 'react'

const Messages = (props) => {
    return(
        <>
            {props.messages.map((message, i) =>{
              return( <li key={i} className={message.isYou ? 'bg-green-500/50 w-1/2 ml-auto m-2 p-2 rounded-md' : 'bg-gray-200 w-1/2 mr-auto m-2 p-2'}>
                    <div className="flex flex-col">
                        <div className="font-bold text-black break-words">{message.senderId}</div>
                        <div className="text-lg break-words">{message.body}</div>
                    </div>
                </li>
                );
            })}
        </>
    );
}

export default Messages;