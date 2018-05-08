function setCookies(json) {

document.cookie = `user_id=${json.id}; expires=` + setExpiration(60).toUTCString() + "; path=/";
document.cookie = `user_name=${json.name}; expires=` + setExpiration(60).toUTCString() + "; path=/";
}
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setExpiration(minutes) {
  var now = new Date();
  now.setTime(now.getTime() + minutes * 60 * 1000);
  return now
}