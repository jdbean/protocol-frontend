// import ActionCable from 'actioncable';
// console.log(ActionCable)
//
//
// let postData = {
//   "name":"Jeremy","password":"password"
// }
//
// fetch('http://localhost:3000/authenticate', {
//   method: 'POST',
//   body: JSON.stringify(postData),
//   headers: {
//     mode:'no-cors',
//     'Accept': 'application/json',
//     "Content-Type" : 'application/json'
//   },
//   credentials: 'same-origin'
// }).then((res) => res.json()).then((json) => {
//   let token = json.auth_token
//
//   get_user(token)
// }).then()
//
// function get_user(token) {
// fetch('http://localhost:3000/api/v1/users/1', {
//   method: 'GET',
//   headers: {
//     Authorization: `token ${token}`,
//     mode: 'no-cors',
//     'Accept': 'application/json',
//     'content-type': 'application/json'
//   }
// }).then(res => (res.json())).then(console.log)
// }

// (function() {
//   this.App || (this.App = {});
//
//   App.cable = ActionCable.createConsumer("ws://localhost:3000/cable");
// }).call(this);

// ActionCable = require('actioncable')


//
//
cable = ActionCable.createConsumer('ws://localhost:3000/cable')
// cable = ActionCable.createConsumer('ws://192.168.3.8:3000/cable')


// var cable = ActionCable.createConsumer('ws://localhost:3000/cable');

var channel = cable.subscriptions.create({channel:
     "ChatChannel", room: "new_room"},
    {
        connected: function() {
            console.log("connected");
        },
        disconnected: function() {
            console.log("disconnected");
        },
        received: function(data) {
            console.log('received');
            console.log(data);
            let newMessage = document.createElement('p')
            newMessage.innerText = `${data.message}`
            document.querySelector('body').appendChild(newMessage)
        }
    }
);

const messageForm = document.querySelector('#message-form')
const messageBox = messageForm.querySelector('#message-box')
messageForm.addEventListener('submit', (e) => {

  e.preventDefault()
  channel.send({to: 'chat_new_room', message: messageBox.value })
});
 document.cookie = "user_name = Jeremy"
// messageform.onsubmit = (e) => {
// e.preventDefault();
// console.log("submitted")}
// (e) => {
// e.preventDefault();
// channel.send({to: 'chat_new_room', message: messageBox.value })
// }
// cable.subscriptions.create({channel: "ChatChannel", room: "new_room"});
// chatChannel.send({ sent_by: "JDBEAN", body: "This is a cool chat app." }));
// let chatChannel = cable.subscriptions.create({ channel: "ChatChannel", room: "new_room" },
//   received: (data) =>
//   chatChannel.send({ sent_by: "Paul", body: "This is a cool chat app." })
// message = ActionCable.server.broadcast(
//   "ChatChannel",
//   sent_by: 'Jeremy',
//   body: 'This is a cool chat app.'
// )
// cable.subscriptions.create 'AppearanceChannel',
