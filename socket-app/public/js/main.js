const bidForm = document.getElementById('bid-form');
const oldBids = document.querySelector('.old-bids');
const roomName = document.getElementById('room-header');
const userList = document.getElementById('users');
const inputField = document.getElementById('bid');
const productNameField = document.getElementById('product-name');
const currentPriceField = document.getElementById('product-current-price');

// Get username and room from URL
const { username, productid, userid, productname } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
const room = productid
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, userid, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(productname);
  outputUsers(users);
});

var max =0;

// Message from server
socket.on('bid', bid => {
  inputField.min = Number(bid.currentPrice) + 1;
  productNameField.innerText = productname
  currentPriceField.innerText = bid.currentPrice + "₺"
  outputMessage(bid);
  // Scroll down
  oldBids.scrollTop = oldBids.scrollHeight;
});

bidForm.addEventListener('submit', async e => {
  e.preventDefault();
  // @TO-DO update the minimum value to the (highest bid + 1) using -> inputField.min = 99

  // Get message text
  var givenbid = e.target.elements.bid.value;
  
  inputField.min = parseInt(givenbid)+1;
  max = inputField.min;


  //msg = msg.trim();

  if (!givenbid){
    return false;
  }
  
  socket.emit('chatMessage', givenbid);
    // Clear input
    e.target.elements.bid.value = '';
    e.target.elements.bid.focus();
});


// Output message to DOM
function outputMessage(bid) {
  const div = document.createElement('div'); //create a div for each bid
  div.classList.add('bid'); //add class
  const p = document.createElement('p'); //create a paragraph
  p.classList.add('meta'); //add meta class, which shows username and time

  p.innerText = bid.username; //rewrite username
  p.innerHTML += `<span> ${bid.time}</span>`; //update the bid time
  div.appendChild(p); //add paragraph to div

  //the input given by user
  const para = document.createElement('p');
  para.classList.add('bid');
  para.innerText = bid.bid;
  div.appendChild(para);

  //add bid to screen
  document.querySelector('.old-bids').appendChild(div);
}

//Get room name from url
function outputRoomName(room) {
  roomName.innerText = room;
}

//get username from url and add
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }
