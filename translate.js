// Your Google Cloud Platform project ID
// function translate_text(text, target) {
// const Translate = require('@google-cloud/translate');
// const projectId = 'stable-device-201314';
// const key_file = 'keys.json'
// // Instantiates a client
// const translate = new Translate({
//   projectId: projectId, keyFilename: key_file });
//
// // The text to translate
//
// // The target language
//
//
// // Translates some text into Russian
// translate
//   .translate(text, target)
//   .then(results => {
//     const translation = results[0];
//
//     console.log(`Text: ${text}`);
//     console.log(`Translation: ${translation}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// }
// const text = 'hola, senora, como estas?';
// const target = 'en';
// translate_text(text, target)
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
    mode:'no-cors',
    'Accept': 'application/json',
    "Content-Type" : 'application/json'
  }
}).then(res => res.json()).then(json => json.message
)

}
