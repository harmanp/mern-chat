/* eslint-disable no-redeclare */
/* eslint-disable no-unused-consts */
/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable new-cap */
/* eslint-disable no-undef */

const express = require('express')
const app = express()
const router = express.Router()
const Events = require('../models/Events.js')

// Socket IO

// eslint-disable-next-line no-unused-vars
// Socket IO
// server = app.listen(4000)

// socket.io implementation

// const io = require('socket.io')(server)

// io.on('connection', (socket) => {
//   socket.join('Super Chat')
//   socket.roomName = 'Super Chat'
//   socket.username = 'Anonymous'

//   // saving connection event
//   var connectEvent = new events({eventType: 'connection', userName: socket.username, socketID: socket.id})
//   connectEvent.save()

//   console.log('New user connected!')

//   var joinRoomHelper = (room) => {
//     // join room event and save event to db
//     var joinEvent = new events({eventType: 'join-room', userName: socket.username, socketID: socket.id, room: room})
//     joinEvent.save()
//     console.log('join room event')
//     socket.join(room)
//     socket.roomName = room
//     io.sockets.in(room).emit('userJoined', socket.username + ' joined the ' + socket.roomName + ' room!')
//   }

//   joinRoomHelper(socket.roomName)

//   socket.on('join-room', (room) => {
//     const oldRoom = socket.roomName

//     // leave room event and save event to db
//     var leaveEvent = new events({eventType: 'leave-room', userName: socket.username, socketID: socket.id, room: oldRoom})
//     leaveEvent.save()
//     socket.leave(oldRoom)
//     io.sockets.in(oldRoom).emit('userLeft', socket.username + ' has left the room!')

//     joinRoomHelper(room)
//   })

//   socket.on('change_username', (data) => {
//     var changeUsernameEvent = new events({eventType: 'change_username', userName: data.username, socketID: socket.id})
//     changeUsernameEvent.save()
//     socket.username = data.username
//   })

//   socket.on('new_message', (data) => {
//     var newMessageEvent = new events({eventType: 'new_message', userName: socket.username, socketID: socket.id, room: data['room']})
//     newMessageEvent.save()
//     console.log(data)
//     console.log(data['room'])

//     var receivers = []
//     var object = io.sockets.in(data['room']).connected
//     for (var key in object) {
//       if (object[key].id !== socket.id && object[key].roomName === data['room']) { receivers.push(object[key].username) }
//     }

//     console.log(receivers)

//     var newMessage = new messages({userName: socket.username, message: data['message'], receivers: receivers, room: data['room'] })
//     newMessage.save(function (err) {
//       if (err) console.error(err)
//     })
//     io.sockets.in(data['room']).emit('message_received', {message: data.message, username: socket.username})
//   })

//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', {username: socket.username})
//   })

//   socket.on('clear', () => {
//     socket.broadcast.emit('clear')
//   })

//   socket.on('disconnect', () => {
//     var disconnectEvent = new events({eventType: 'disconnect', userName: socket.userName, socketID: socket.id})
//     disconnectEvent.save()
//     console.log('disconnect event')
//     io.sockets.in(socket.roomName).emit('userDisconnect', socket.username + ' has disconnected')
//   })
// })

/* GET ALL CHATS */

router.get('/', function (req, res, next) {
  Events.find(function (err, products) {
    if (err) return next(err)
    res.json(products)
  })
})
router.get('/:roomid', function (req, res, next) {
  Events.find({ room: req.params.roomid }, function (err, products) {
    if (err) return next(err)
    res.json(products)
  })
})

/* GET SINGLE CHAT BY ID */
router.get('/:id', function (req, res, next) {
  Events.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

// router.get('/find_by/:room_name', function (req, res, next) {
//   Room.findOne({ room_name: req.params.room_name }).populate('chats').exec(function (err, room) {
//     if (err) return next(err)
//     console.log(room.chats)
//     res.json({})
//   })
// })

/* SAVE CHAT */
router.post('/', function (req, res, next) {
  Events.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* UPDATE CHAT */
router.put('/:id', function (req, res, next) {
  Events.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE CHAT */
router.delete('/:id', function (req, res, next) {
  Events.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router
