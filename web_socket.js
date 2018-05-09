function establishSocket() {
  cable = ActionCable.createConsumer(`ws://${serverAddress}/cable`)
}

function newChannel() {
  channel = cable.subscriptions.create({
    channel: "ChatChannel",
    room: "new_room",
    username: getCookie("user_name")
  }, {
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

      let br = document.createElement('br')
      newMessage.className = "newMessage"

      switch (data.message_type) {
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

    }
  });
  console.log(channel)
}
