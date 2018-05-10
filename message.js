function messageListener() {
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
        to: 'chat_new_room',
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
function renderMessage(data) {

  console.log(data)
  translate(getCookie('user_lang'), data.message).then(message => {
    if (!!data.user) {
      var user = data.user.name
    }
    else {
      var user = data.sender
    }
    console.log(message)
  let newMessage = document.createElement('li')
  newMessage.className = "clearfix"
  newMessage.innerHTML += `
    <div class="message-data align-right">
      <span class="message-data-time">${data.created_at}</span> &nbsp; &nbsp;
      <span class="message-data-name">${user}</span> <i class="fa fa-circle me"></i>
    </div>
    <div class="message other-message float-right">
      ${message}
    </div>`
  chatHistory.appendChild(newMessage)
  // newMessage.innerText = `${message}`
  // let br = document.createElement('br')
  // newMessage.className = "message"
  // messages.appendChild(newMessage)
  // messages.appendChild(br)

  chatWrapper.scrollTop = chatWrapper.scrollHeight;


})
}
function loadMessages(channel) {
  console.log(channel)
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

  console.log(channel)
  loadMessages(channel).then(json => {

    json.messages.forEach(message => {
      renderMessage(message)
    })
  })
}
