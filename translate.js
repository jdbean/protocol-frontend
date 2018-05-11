function translate(language, text) {
  let token = getCookie('session_token')
  formData = {
    language: language,
    text: text
  }
  return fetch(`http://${serverAddress}/translate`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Authorization: `token ${token}`,
      mode: 'no-cors',
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    }
  }).then(res => res.json()).then(json => json.message)
}

function changeLanguage(language) {
  let token = getCookie('session_token')
  let name = getCookie('user_name')
  let formData = {
    language_id: language_ids[language]
  }
  fetch(`http://${serverAddress}/api/v1/users/${name}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: {
        Authorization: `token ${token}`,
        mode: 'no-cors',
        'Accept': 'application/json',
        "Content-Type": 'application/json'
      }
  }).then(res => res.json()).then(console.log)
  document.cookie = `user_lang=${languages[`${language}`]}; expires=` + setExpiration(60).toUTCString() + "; path=/";
}
function renderLanguageSelect() {
  selectLang.innerHTML = ''
  let list = Object.keys(languages)
  list.forEach(lang => {
    var op = document.createElement('option')
    op.innerHTML = lang
  
    selectLang.appendChild(op)
  })
}
