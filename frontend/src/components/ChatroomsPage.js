import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './ChatroomsPage.css';
import axios from 'axios';

const socket = io('http://localhost:8080');

function ChatroomsPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Validate the token
    axios.get('/validateToken', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        if (!response.data.valid) {
          navigate('/');
        }
      })
      .catch(() => navigate('/'));

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection
    return () => {
      socket.off('message');
    };
  }, [navigate]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div className="chatroom-page">
      <header className="chatroom-header">
        <h1>NZChat</h1>
      </header>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatroomsPage;
