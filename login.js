let loadLogin = function(errors = []) {
  renderErrors(errors)
  renderLoginForm()
  loginForm.onsubmit = (e) => {
    e.preventDefault()
    removeErrors()
    const formData = {}
    formData.name = userName.value
    formData.password = password.value
    authUser(formData).then((res) => {
      if (res.status === 401) {
    loadLogin(["Invalid Username or Password"])
  } else {
    return res.json()
  }
}).then((json) => {
  if (typeof json === 'object') {
      console.log(json)
      let token = json.auth_token
      get_user(token, formData.name)
      renderMain()
    }
    })

  }
}

function authUser(formData) {
  return fetch(`http://${ServerAddress}/authenticate`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      mode:'no-cors',
      'Accept': 'application/json',
      "Content-Type" : 'application/json'
    }
  })
}


function renderLoginForm() {
  mainContentContainer.innerHTML = `
    <form id=loginForm>
      Username:<br>
      <input type="text" id=userName name="username"><br>
      Password:<br>
      <input type="password" id=password name="password"><br>
      <input id="submit" type="submit" value="Submit">
    </form>`
}
function removeErrors() {
  let errors = document.querySelectorAll('.error')
  errors.forEach(el => el.remove())
}

function renderErrors(errors = []) {
  errors.forEach(el => {
    let error = document.createElement('h1')
    error.className = 'error'
    error.innerHTML = el
    document.body.prepend(error)
  }
  )
}


let is_loggedin = function() {
  document.cookie ? renderMain() : loadLogin()
}
