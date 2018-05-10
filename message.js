function messageListener(channelName) {
  messageToSend.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      sendButton.click();
    }
  });
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let date = new Date()
      channel.send({
        to: `chat_${channelName}`,
        message: messageToSend.value,
        sender: getCookie('user_name'),
        time: date
      })
      messageToSend.value = ""
  })
}

function renderMessagesDiv() {
  let messagesDiv = document.createElement('div')
  messagesDiv.id = 'messages'
  messagesDiv.innerHTML = '<h2> Messages </h2>'
  mainContentContainer.append(messagesDiv)
}

// function renderMembersListDiv() {
//   let membersListDiv = document.createElement('div')
//   membersListDiv.id = 'members'
//   membersListDiv.innerHTML= '<h2> Members List </h2>'
//   mainContentContainer.append(membersListDiv)
// }

function renderMessage(data, message) {

  console.log(data)
    if (!!data.user) {
      var user = data.user.name
      var timestamp = data.created_at
      var time = new Date(timestamp)
      time = `${time.toDateString()} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }
    else {

      // let days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"}
      var user = data.sender
      var time = new Date(Date.now())
      time = `${time.toDateString()} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }
    console.log(message)
  let newMessage = document.createElement('li')
  newMessage.className = "clearfix"

  if (user === getCookie('user_name')) {
  newMessage.innerHTML += `
    <div class="message-data align-right">
      <span class="message-data-time">${time}</span> &nbsp; &nbsp;
      <span class="message-data-name">${user}</span> <i class="fa fa-circle me"></i>
    </div>
    <div class="message other-message float-right">
      ${message}
    </div>`
  }
  else {
    newMessage.innerHTML += `
    <li>
           <div class="message-data">
             <span class="message-data-name"><i class="fa fa-circle online"></i> ${user}</span>
             <span class="message-data-time">${time}</span>
           </div>
           <div class="message my-message">
            ${message}
           </div>
         </li>
    `
  }
  chatHistory.appendChild(newMessage)
  // newMessage.innerText = `${message}`
  // let br = document.createElement('br')
  // newMessage.className = "message"
  // messages.appendChild(newMessage)
  // messages.appendChild(br)

  chatWrapper.scrollTop = chatWrapper.scrollHeight;
}
function loadMessages(channel) {

  return fetch('http://localhost:3000/channels/' + channel, {
    method: "GET", headers: {
      Authorization: `token ${getCookie('session_token')}`,
      mode: 'no-cors',
      'Accept': 'application/json',
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}
function renderMessages(channel) {
  chatHistory.style.display = 'none'
  loading.style.display = 'block'
  console.log(channel)
  var promises = []
  loadMessages(channel).then(json => {
  json.messages.forEach(message => {
      promises.push(translate(getCookie('user_lang'), message.message))
      console.log('hi')
    })

    Promise.all(promises).then(res => {
    for(let i=0; i < promises.length; i++) {
      renderMessage(json.messages[i], res[i])
    }
    chatHistory.style.display = 'block'
    loading.style.display = 'none'
    chatWrapper.scrollTop = chatWrapper.scrollHeight;
    })
  })
}
