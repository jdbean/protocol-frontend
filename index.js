let renderMain = function() {
  establishSocket()
  newChannel()
  renderMessageForm()
}
document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
