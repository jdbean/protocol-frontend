let serverAddress = '192.168.3.8:3000'

function establishSocket() {
  cable = ActionCable.createConsumer(`ws://${serverAddress}/cable`)
}

function newChannel() {
  channel = cable.subscriptions.create({channel:
       "ChatChannel", room: "new_room", username: getCookie("user_name")},
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
}
