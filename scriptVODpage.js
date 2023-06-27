const headers = new Headers();
let accessToken=null; // declare accessToken variable

let currentIframes = []; // keep track of current iframes

function updateStreams() {
  if (!accessToken) return; // if accessToken is null, return and do nothing
  fetch('https://api.platformcraft.ru/1/players',{
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + accessToken
    })
  })
    .then(response => response.json())
    .then(data => {
      const newIframes = data.players.map(link => (link.frame_tag));
      const deletedIframes = currentIframes.filter(iframe => !newIframes.includes(iframe));
      const changedIframes = newIframes.filter((iframe, index) => iframe !== currentIframes[index]);
      if (deletedIframes.length > 0 || changedIframes.length > 0) { // only update if iframes have changed
        currentIframes = newIframes;
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = currentIframes.join(''); // inject new iframes into the HTML code
      }
      console.log("Privet");
    });
}

function getAccessToken() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    var response = JSON.parse(e.target.responseText);
    accessToken = response.access_token; // set accessToken variable
    updateStreams(); // call updateStreams once access token is retrieved
  });
  xhr.addEventListener('error', function(e) {
    console.error('Request errored with status', e.target.status);
  });
  xhr.open('POST', 'https://auth.platformcraft.ru/token');
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  var body = 'login=greenatom&password=123123'; // replace with your own login and password
  xhr.send(body);
  console.log("gettoken")
}

getAccessToken(); // fetch access token once on page load

// Call the function once a day (86400000 milliseconds)
setInterval(getAccessToken, 86400000);
setInterval(updateStreams, 10000); // update streams every 10 seconds
