const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  messages: [{ sender: String, message: String, timestamp: Date }]
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);
