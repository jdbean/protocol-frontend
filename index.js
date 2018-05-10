// const serverAddress = '192.168.3.8:3000'
const serverAddress = 'localhost:3000'

let renderMain = function() {
  establishSocket()
  switchChannel()
  loginContent.style.display = 'none'
  mainContentContainer.style.display = 'block'

}

let switchChannel = function (channelName = "new_room") {
  newChannel(channelName)
  messageListener(channelName)
  renderMessages(channelName)
}

document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
