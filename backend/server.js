const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User'); // Updated to use your existing file
const userRoutes = require('./routes/user'); // Import the user routes

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection string from .env file
const uri = process.env.MONGO_URI;

// Options for Mongoose client
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

// Connect to MongoDB
mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error: ", err);
  });

// Middleware
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes); // Use the user routes

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
