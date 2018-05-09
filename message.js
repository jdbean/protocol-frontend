function renderMessageForm() {
  mainContentContainer.innerHTML = `
    <form id=message-form>
      Message:<br>
      <input type="text" id=message-box name="message"><br>
      <input id="submit" type="submit" value="Submit">
    </form>`

  const messageForm = document.querySelector('#message-form')
  const messageBox = messageForm.querySelector('#message-box')

  messageForm.addEventListener('submit', (e) => {
    let date = new Date()
    e.preventDefault()
      channel.send({
        to: 'chat_new_room',
        message: messageBox.value,
        sender: getCookie('user_name'),
        time: date
      })
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
  translate(getCookie('user_lang'), data.message).then(message => {
  let newMessage = document.createElement('p')
  newMessage.innerText = `${message}`
  let br = document.createElement('br')
  newMessage.className = "newMessage"
  messages.appendChild(newMessage)
  messages.appendChild(br)
})
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
  loadMessages(channel).then(json => {
    json.messages.forEach(message => {
      renderMessage(message)
    })
  })
}
