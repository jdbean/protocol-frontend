let renderMain = function() {
  establishSocket()
  newChannel()
  let messages = document.createElement('div')
  renderMessageForm()
  renderMessagesDiv()
  // renderMembersListDiv()
}
document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
