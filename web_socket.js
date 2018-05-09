// const ServerAddress = '192.168.3.8:3000'
const ServerAddress = 'localhost:3000'

function establishSocket() {
  cable = ActionCable.createConsumer(`ws://${ServerAddress}/cable`)
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
<<<<<<< HEAD
              let newMessage = document.createElement('p')
              newMessage.innerText = `${data.message}`
              let br = document.createElement('br')
              newMessage.className = "newMessage"
              // document.querySelector('body').appendChild(newMessage)
              // document.body.appendChild(br)
              let messages = document.querySelector('#messages')
              messages.appendChild(newMessage)
              messages.appendChild(br)
=======
              switch(data.message_type) {
                case "message":
                  let newMessage = document.createElement('p')
                  newMessage.innerText = `${data.message}`
                  messages.appendChild(newMessage)
                  break;
                // case "members_list":
                // members.innerHTML= '<h2> Members List </h2>'
                //   data.members.forEach( member => {
                //     let newMember = document.createElement('li')
                //     newMember.innerText = member
                //     members.appendChild(newMember)
                //   })
                  // break;
                case "message_error":
                  console.log("RECIEVED AN ERROR MESSAGE")
                  break;
                default:
                    console.log("Recived a broadcast without a message_type")
              }
>>>>>>> 9b444db8391d735e944bf697e304675f3e4064bb
          }
      }
  );
}
