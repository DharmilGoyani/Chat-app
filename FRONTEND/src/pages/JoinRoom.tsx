import { ReactElement, useRef, useState } from "react";
import { Random } from "./Random"
import { CodeSection } from "./CodeSection";
import { useNavigate } from "react-router-dom";

export function JoinRoom({ ws ,setRoom , setName}: any) {
  const [last , setLast] = useState<ReactElement>();
  
  
  const navigate = useNavigate();
  const nameRef = useRef("");
  const inpRoomCode = useRef("");

  function joinRoom() {
      //@ts-ignore
      if(nameRef.current.value != "" && inpRoomCode.current.value != ""){
        ws.send(JSON.stringify({
          type: "join",
          //@ts-ignore
          roomId: inpRoomCode.current.value,
          //@ts-ignore
          name: nameRef.current.value
        }))
        //@ts-ignore

        setName(nameRef.current.value);
        navigate("/chat");
      }
      
  }
  
  function genarateRoom() {

    const roomCode = Random();
    setRoom(roomCode);

    setLast(<CodeSection roomCode={roomCode} />)

  }
    return <div className='container mx-auto max-w-2xl p-4 h-screen flex items-center justify-center bg-black text-white'>
    <div className='rounded-xl border bg-card text-card-foreground shadow w-full'>
      <div className='flex flex-col p-6 space-y-1'>
        <div className='tracking-tight text-2xl flex items-center gap-2 font-bold'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle w-6 h-6"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
            Real Time Chat
        </div>
      </div>
      <div className='p-6 pt-0'>
        <div className='space-y-4'>
          <button onClick={genarateRoom} className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 w-full text-lg py-6 border hover:cursor-pointer">Create New Room</button>
          <div className='flex gap-2'>
            <input ref={nameRef} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-lg py-5" placeholder="Enter your name" fdProcessedId="qc5p1q" />
          </div>
          <div className="flex gap-2">

            <input ref={inpRoomCode} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-lg py-5" placeholder="Enter Room Code"  />
            
            <button onClick={joinRoom} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 border hover:cursor-pointer" >Join Room</button>
          </div>
          {last}
        </div>
      </div>
    </div>
  </div>
}