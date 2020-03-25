var mongoose = require('mongoose'), Schema = mongoose.Schema

var RoomSchema = new mongoose.Schema({
  room_name: String,
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  created_date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Room', RoomSchema)
