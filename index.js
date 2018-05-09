let renderMain = function() {
  establishSocket()
  newChannel()
  renderMessageForm()
  renderMessagesDiv()
  // renderMembersListDiv()
}
document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
