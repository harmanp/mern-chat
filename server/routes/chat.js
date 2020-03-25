/* eslint-disable no-unused-consts */
const express = require('express')
const router = express.Router()
// eslint-disable-next-line no-unused-consts
const Chat = require('../models/Chat.js')
const Room = require('../models/Room.js')

// Socket IO
// server.listen(4000)

// io.on('connection', function (socket) {
//   console.log('User connected')
//   socket.on('disconnect', function () {
//     console.log('User disconnected')
//   })
//   socket.on('save-message', function (data) {
//     console.log(data)
//     io.emit('new-message', { message: data })
//   })
// })

/* GET ALL CHATS */

router.get('/', function (req, res, next) {
  Chat.find(function (err, products) {
    if (err) return next(err)
    res.json(products)
  })
})
router.get('/:roomid', function (req, res, next) {
  Chat.find({ room: req.params.roomid }, function (err, products) {
    if (err) return next(err)
    res.json(products)
  })
})

/* GET SINGLE CHAT BY ID */
router.get('/:id', function (req, res, next) {
  Chat.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* SAVE CHAT */
router.post('/', function (req, res, next) {
  Chat.create(req.body, function (err, chat) {
    if (err) return next(err)
    Room.findById(chat.room, function (err, room) {
      if (err) return next(err)

      room.chats.push(chat)
      room.save()
      res.json(chat)
    })
  })
})

/* UPDATE CHAT */
router.put('/:id', function (req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE CHAT */
router.delete('/:id', function (req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router
