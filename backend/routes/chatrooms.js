const express = require('express');
const router = express.Router();
const Chatroom = require('../models/Chatroom');

// Create a new chatroom
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const newChatroom = new Chatroom({ name, messages: [] });
    await newChatroom.save();
    res.status(201).send('Chatroom created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Additional chatroom routes (e.g., fetch messages) can be added here

module.exports = router;
