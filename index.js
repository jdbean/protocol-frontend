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
  }
}).then((res) => res.json()).then((json) => {
  let token = json.auth_token
  get_user(token)
})

function get_user(token) {
// var now = new Date();
// now.setTime(now.getTime() + 1 * 5 * 1000);
// document.cookie = "user_id=1; expires=" + now.toUTCString() + "; path=/";
fetch('http://localhost:3000/api/v1/users/1', {
  method: 'GET',
  headers: {
    Authorization: `token ${token}`,
    mode: 'no-cors',
    'Accept': 'application/json',
    'content-type': 'application/json'
  }
}).then(res => (res.json())).then(json => {
  console.log(json)
  var now = new Date();
now.setTime(now.getTime() + 1 * 1000 * 1000);
document.cookie = "user_name=Jeremy; expires=" + now.toUTCString() + "; path=/";

cable = ActionCable.createConsumer('ws://localhost:3000/cable')
// cable = ActionCable.createConsumer('ws://192.168.3.8:3000/cable')

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
})
}
