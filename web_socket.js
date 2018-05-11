function establishSocket() {
  cable = ActionCable.createConsumer(`ws://${serverAddress}/cable`)
}

function newChannel(channelName) {
  document.cookie = `current_room=chat_${channelName}; expires=` + setExpiration(60).toUTCString() + "; path=/";
  channel = cable.subscriptions.create({
    channel: "ChatChannel",
    room: channelName,
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
      switch (data.message_type) {
        case "message":
        if (!last) {
          var last = [""]
        }
        if (data.to === getCookie('current_room') && last[0] !== data) {
        last.unshift(data)
        translate(getCookie('user_lang'), data.message).then(message => renderMessage(data, message))
      }

          break;
        case "message_error":
          console.log("RECIEVED AN ERROR MESSAGE")
          break;
        default:
          console.log("Recived a broadcast without a message_type")
      };
console.log(channel)
}
})
}

// case "members_list":
// members.innerHTML= '<h2> Members List </h2>'
//   data.members.forEach( member => {
//     let newMember = document.createElement('li')
//     newMember.innerText = member
//     members.appendChild(newMember)
//   })
// break;
