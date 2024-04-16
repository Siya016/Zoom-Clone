import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit("room:join", { name, email, room });
  }, [name, email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
    const { name, email, room } = data;
    navigate(`/room/${room}`);
  }, [navigate]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    }
  }, [socket, handleJoinRoom]);

  return (
    <div className='hm-ctnr'>
      <h1 className='head'>Find ~ A ~ Friend</h1>

      <form onSubmit={handleSubmitForm} className='in-ctnr'>
        <input 
          type="email" 
          id='email' 
          value={email} 
          onChange={e => setEmail(e.target.value)} placeholder='Enter Your Email' 
        />
        <input 
          type="text" 
          id='usrnm' 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder='Enter Username' 
        />
        <input 
          type="text" 
          id='room' 
          value={room} 
          onChange={e => setRoom(e.target.value)} 
          placeholder='Enter Room ID' 
        />

        <button>Enter</button>
      </form>
    </div>
  )
}

export default LobbyScreen;
