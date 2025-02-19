
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { JoinRoom } from './pages/JoinRoom'
import { ChatRoom } from './pages/ChatRoom'
import { useEffect, useRef, useState } from 'react'

function App() {

  const [socket , setSocket] = useState();
  const [message , setMessage] = useState([]);
  const [room , setRoom] = useState();
  const [name , setName] = useState();
  const [senderName , setSenderName] = useState();

  const wsRef = useRef();

  useEffect(() => {
    const ws: WebSocket = new WebSocket("ws://localhost:8080"); 
    wsRef.current = ws;

    setSocket(ws);
    
    ws.onmessage = (ev) => {
      console.log(ev.data);
      
      const data = JSON.parse(ev.data);
      console.log(data);
      
      setMessage(m => [...m , 
        {message: data.message , name: data.name}
      ]);
      setSenderName(data.name);
    }
    // ws.onopen = () => {
    //   ws.send(JSON.stringify({
    //     type: "join",
    //     roomId: inpRoomCode.current.value,
    //     name: nameRef.current.value
    //   }))
    // }

    // navigate("/chat");
    return () => {
      ws.close();
    }

  } , [])
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JoinRoom setMessage={setMessage} ws={wsRef.current}  setSocket={setSocket} setRoom={setRoom} setName={setName}/>} />

          <Route path='/chat' element={<ChatRoom ws={wsRef.current} message={message} room={room} name={name} senderName={senderName} />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
