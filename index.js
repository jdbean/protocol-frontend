let renderMain = function() {
  establishSocket()
  newChannel()
  let messages = document.createElement('div')
  messages.id = 'messages'
  document.body.appendChild(messages)
  renderMessageForm()
  renderMessagesDiv()
  // renderMembersListDiv()
}
document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
