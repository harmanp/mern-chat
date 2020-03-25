const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

var Events = require('./models/Events.js')
var room = require('./routes/room');
var chat = require('./routes/chat');
var events = require('./routes/events');
var roomhistory = require('./routes/roomhistory');


const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;


const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  promiseLibrary: require('bluebird') 
}).then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

io.on('connection', function (socket) {
  var userConnectEvent = new Events({eventType: 'user-connected', socketID: socket.id, message: 'User Connected'})
  userConnectEvent.save()

  socket.on('disconnect', function () {
    var userDisconnectEvent = new Events({eventType: 'user-disconnected', socketID: socket.id, message: 'User disconnected'})
    userDisconnectEvent.save()
  })
  socket.on('new-message', function (data) {
    console.log(data)
    var newMessageEvent = new Events({eventType: data.eventType, userName: data.nickname, socketID: socket.id, room: data.room, message: data.message})
    newMessageEvent.save()
    io.emit('new-message', { message: data })
  })
});

// io.on('connection',(socket) => {

//   // Get the last 10 messages from the database.
//   Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
//     if (err) return console.error(err);

//     // Send the last messages to the user.
//     socket.emit('init', messages);
//   });

//   // Listen to connected users for a new message.
//   socket.on('message', (msg) => {
//     // Create a message with the content and the name of the user.
//     const message = new Message({
//       content: msg.content,
//       name: msg.name,
//     });

//     // Save the message to the database.
//     message.save((err) => {
//       if (err) return console.error(err);
//     });

//     // Notify all other users about a new message.
//     socket.broadcast.emit('push', msg);
//   });
// });

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err.status);
// });

http.listen(port, () => {
  console.log('listening on *:' + port);
});
module.exports = app;