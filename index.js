// const serverAddress = '192.168.3.8:3000'
const serverAddress = 'localhost:3000'

let renderMain = function() {
  establishSocket()
  switchChannel()
  loginContent.style.display = 'none'
  mainContentContainer.style.display = 'block'

}

let switchChannel = function () {
  newChannel()
  messageListener()
  renderMessages('new_room')
}

document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
