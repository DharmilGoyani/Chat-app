
import { ReactElement, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

//@ts-ignore
export function ChatRoom({ws , message ,room , name , senderName}) {
  

    

    //@ts-ignore
    const inputRef = useRef();

    const navigate = useNavigate();
  

    
    

    function sendMessage() {

        if(!inputRef.current) return;
        //@ts-ignore
        const currMessage = inputRef.current.value;
        
        
        //@ts-ignore
        ws.send(JSON.stringify({
          "type": "chat",
          "message": currMessage,
          "roomId": room,
          "name": name
        }))

    }
 
    

    return <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="w-[500px] p-5 bg-[#111] rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">💬 Real Time Chat</h2>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m6.364 2.636l-.707.707M21 12h-1m-2.636 6.364l-.707-.707M12 21v-1m-6.364-2.636l.707-.707M3 12h1m2.636-6.364l.707.707"></path></svg>
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Temporary room that expires after all users exit
          </p>
          <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg">
            <span className="text-gray-300 text-sm">Room Code: {room} </span>
          </div>
          <div className="text-right text-sm text-gray-400 mt-1">Users: 1</div>
          <div className="h-100 overflow-auto bg-black p-3 rounded-lg mt-3">
            {message.map(x => (
                (x.name == name 
                  ?<div className="flex justify-end">
                    <div className="mt-3">
                    <span className="flex mb-1 justify-end">{x.name}</span>
                    <span className="border rounded bg-white text-black p-1 px-2 w-full">
                        {x.message}
                    </span>
                    </div>
                  </div>
                  :<div className="mt-3">
                    <span className="flex mb-1">{x.name}</span>
                    <span className="border rounded bg-white text-black p-1 px-2">
                        {x.message}
                    </span>
                    </div>
                )
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <input
                //@ts-ignore
                ref={inputRef}
              className="flex-1 bg-gray-800 text-white p-2 rounded-lg border border-gray-600"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-white text-black px-4 py-2 rounded-lg">Send</button>
          </div>
        </div>
      </div>
  }
  




  // <div className="mt-3">
  //                   <span className="flex mb-1">{x.name}</span>
  //                   <span className="border rounded bg-white text-black p-1 px-2">
  //                       {x.message}
  //                   </span>
  //               </div>