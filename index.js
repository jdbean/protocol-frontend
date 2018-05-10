// const serverAddress = '192.168.3.8:3000'
const serverAddress = 'localhost:3000'

let renderMain = function() {
  establishSocket()
  newChannel()
  // let messages = document.createElement('div')
  // renderMessageForm()
  // renderMessagesDiv()
  renderMessages('new_room')
  // renderMembersListDiv()
  loginContent.style.display = 'none'
  mainContentContainer.style.display = 'block'

}

document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
