var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(e) {
  var response = JSON.parse(e.target.responseText);
  var accessToken = response.access_token;
  console.log(accessToken);
});
xhr.addEventListener('error', function(e) {
  console.error('Request errored with status', e.target.status);
});
xhr.open('POST', 'https://auth.platformcraft.ru/token');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
var body = 'login=login&password=password'; //укажите свои логин и пароль
xhr.send(body);
