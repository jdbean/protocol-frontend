// Your Google Cloud Platform project ID
function translateText(text, target) {
const Translate = require('@google-cloud/translate');
const key_file = 'keys.json'
// Instantiates a client
const translate = new Translate({ keyFilename: key_file });

// Translates some text
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    return translation
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}
// const text = 'hola, senora, como estas?';
// const target = 'en';
// translateText(text, target)
