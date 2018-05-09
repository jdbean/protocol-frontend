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
