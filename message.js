// function renderMessageForm() {
//   mainContentContainer.innerHTML = `
//     <form id=message-form>
//       Message:<br>
//       <input type="text" id=message-box name="message"><br>
//       <input id="submit" type="submit" value="Submit">
//     </form>`
//
//   const messageForm = document.querySelector('#message-form')
//   const messageBox = messageForm.querySelector('#message-box')
//
//   messageForm.addEventListener('submit', (e) => {
//     let date = new Date()
//     e.preventDefault()
//       channel.send({
//         to: 'chat_new_room',
//         message: messageBox.value,
//         sender: getCookie('user_name'),
//         time: date
//       })
//   })
// }

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
    console.log(message)
  let newMessage = document.createElement('li')
  newMessage.className = "clearfix"
  newMessage.innerHTML += `
    <div class="message-data align-right">
      <span class="message-data-time">${data.created_at}</span> &nbsp; &nbsp;
      <span class="message-data-name">${data.user.name}</span> <i class="fa fa-circle me"></i>
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
