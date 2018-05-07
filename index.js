let postData = {
  "name":"Jeremy","password":"password"
}

fetch('http://localhost:3000/authenticate', {
  method: 'POST',
  body: JSON.stringify(postData),
  headers: {
    mode:'no-cors',
    'Accept': 'application/json',
    "Content-Type" : 'application/json'
  }
}).then((res) => res.json()).then((json) => {
  let token = json.auth_token

  // fetch('ws://localhost:3000/cable', {
  //   method: "GET",
  //   headers: {Authorization: `token ${token}`}
  // }).then(console.log)

  get_user(token)
})

function get_user(token) {
fetch('http://localhost:3000/api/v1/users/1', {
  method: 'GET',
  headers: {
    Authorization: `token ${token}`,
    mode: 'no-cors',
    'Accept': 'application/json',
    'content-type': 'application/json'
  }
}).then(res => (res.json())).then(console.log)
}
