var express = require('express')
var router = express.Router()
// eslint-disable-next-line no-unused-vars
var mongoose = require('mongoose')
var Room = require('../models/Room.js')

router.post('/:room_name', function (req, res, next) {
  Room.findOne({room_name: req.params.room_name})
    .populate('chats').exec((err, chat) => {
      if (err) return next(err)
      res.json(chat)
    })
})

module.exports = router
