console.log(ActionCable)


let postData = {
  "name":"Jeremy","password":"password"
}

fetch('http://localhost:3000/authenticate', {
  method: 'POST',
  body: JSON.stringify(postData),
  headers: {
    mode:'no-cors',
    'Accept': 'application/json',
    "Content-Type" : 'application/json'
  },
  credentials: 'same-origin'
}).then((res) => res.json()).then((json) => {
  let token = json.auth_token
  document.cookie = "user_name = Jeremy" 
  get_user(token)
}).then()

function get_user(token) {
fetch('http://localhost:3000/api/v1/users/1', {
  method: 'GET',
  headers: {
    Authorization: `token ${token}`,
    mode: 'no-cors',
    'Accept': 'application/json',
    'content-type': 'application/json'
  }
}).then(res => (res.json())).then(console.log)
}

// (function() {
//   this.App || (this.App = {});
//
//   App.cable = ActionCable.createConsumer("ws://localhost:3000/cable");
// }).call(this);

// ActionCable = require('actioncable')

cable = ActionCable.createConsumer('ws://localhost:3000/cable')

cable.subscriptions.create({channel: "ChatChannel"});

// message = ActionCable.server.broadcast(
//   "ChatChannel",
//   sent_by: 'Jeremy',
//   body: 'This is a cool chat app.'
// )
// cable.subscriptions.create 'AppearanceChannel',
