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
    channel.send({to: 'chat_new_room', message: messageBox.value, sender: getCookie('user_name'), time: date})
  });
}
