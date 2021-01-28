const path = require('path');
const moment = require('moment');
const axios = require('axios');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/bids');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const offerHistories = {}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Auctionly';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, userid, room }) => {
    const user = userJoin(socket.id, username, userid, room);
    socket.join(user.room);

    // Welcome current user
    let data = axios.get(`http://localhost:4000/products/${user.room}`).then(res=>res.data)
    data = Promise.resolve(data)
    data.then(val=>{
      socket.emit('bid', formatMessage(botName, 'Welcome to Auctionly!', val.startPrice));
      val.offerHistory.map(item => {
        socket.emit('bid', formatMessage(botName, `${item.offerOwner} sent a offer value: ${item.newBid} ₺ at ${moment(new Date(item.offerDateTime)).format('MMMM Do YYYY, HH:mm')}`, item.newBid));
      })
    }).catch(err=>console.error(err))


    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', bid => {
    const user = getCurrentUser(socket.id);

    axios.post('http://localhost:4000/submit-bid', {
    id: user.room,
    offer: {
      newBid: Number(bid),
      offerDateTime: new Date().toString(),
      offerOwner: user.userid
    }
  })

  io.to(user.room).emit('bid', formatMessage(user.username, `${user.username} sent a offer value: ${bid} ₺ at ${moment(new Date()).format('MMMM Do YYYY, HH:mm')}`, bid));

  });

  // Runs when client disconnects
  
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
  
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
