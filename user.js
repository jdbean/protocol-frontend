function get_user(token, name) {
fetch(`http://${serverAddress}/api/v1/users/` + name, {
  method: 'GET',
  headers: {
    Authorization: `token ${token}`,
    mode: 'no-cors',
    'Accept': 'application/json',
    'content-type': 'application/json'
  }
}).then(res => (res.json())).then(json => {
  console.log(json)
setCookies(json)

console.log("username is " + getCookie('user_name'))
console.log("user id is " + getCookie('user_id'))

  })
}
