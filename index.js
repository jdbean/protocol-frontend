// const serverAddress = '192.168.3.8:3000'
const serverAddress = 'localhost:3000'

let renderMain = function() {
  establishSocket()
  loginContent.style.display = 'none'
  mainContentContainer.style.display = 'block'
  switchChannel()
  
}

let switchChannel = function (channelName = "new_room") {
  chatHistory.innerHTML = ""
  newChannel(channelName)
  messageListener(channelName)
  renderMessages(channelName)
  renderCurrentChannelName(channelName)
  renderChannelList()
}

let renderCurrentChannelName = function (channelName) {
  document.querySelector('.chat-with').innerText = channelName
}

let renderChannelList = function() {
  console.log("Fetching Channels")
  fetch('http://localhost:3000/channels', {
      method: "GET", headers: {
        Authorization: `token ${getCookie('session_token')}`,
        mode: 'no-cors',
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    }).then(res => res.json()
  ).then(json => {
    channelList = document.querySelector('.list')
    channelList.innerHTML = ""
    json.forEach(function(channel) {
      let newChannel = document.createElement('li')
      newChannel.className = "clearfix"
      newChannel.innerHTML=`
      <li class="clearfix">
        <div class="about">
          <div class="name">${channel.title}</div>
          <div class="status">
            <i class="fa fa-circle online"></i> CHANNEL MEMBERS TOTAL
          </div>
        </div>
      </li>
      `
      newChannel.addEventListener('click', () => {
        switchChannel(channel.title)
      });
      channelList.appendChild(newChannel)

    });
  }
)
}

document.addEventListener('DOMContentLoaded', () => {
  is_loggedin()
})
