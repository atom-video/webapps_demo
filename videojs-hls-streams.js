const headers = new Headers();
let accessToken=null; // declare accessToken variable

let currentLinks = []; // keep track of current links
let videoElements = []; // keep track of video elements
let videoPlayers = []; // keep track of video players

function updateStreams() {
  if (!accessToken) return; // if accessToken is null, return and do nothing
  fetch('https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit',{
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + accessToken
    })
  })
    .then(response => response.json())
    .then(data => {
      const newLinks = data.contents.map(link => ('https://' + link.download_url));
      const changedLinks = newLinks.filter((link, index) => link !== currentLinks[index]);
      if (changedLinks.length > 0) { // only update if links have changed
        currentLinks = newLinks;
        const videoContainer = document.getElementById('video-container');
        const existingVideoElements = Array.from(videoContainer.getElementsByTagName('video'));
        const existingLinks = existingVideoElements.map(videoElement => videoElement.getElementsByTagName('source')[0]?.getAttribute('src'));
        const existingLinksSet = new Set(existingLinks);
        changedLinks.forEach(link => {
          if (existingLinksSet.has(link)) {
            existingLinksSet.delete(link);
          } else {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('class', 'video-js vjs-default-skin vjs-big-play-centered');
            videoElement.setAttribute('controls', '');
            videoElement.setAttribute('preload', 'auto');
            videoElement.setAttribute('width', '640');
            videoElement.setAttribute('height', '480');
            videoElement.setAttribute('muted', 'true'); // set the muted property of the video element
            const sourceElement = document.createElement('source');
            sourceElement.setAttribute('src', link);
            sourceElement.setAttribute('type', 'application/x-mpegURL');
            videoElement.appendChild(sourceElement);
            videoElements.push(videoElement); // add new element to array
            videoContainer.appendChild(videoElement);
            const player = videojs(videoElement);
            videoPlayers.push(player); // add new player to array
          }
        });
        videoPlayers.forEach(player => {
          const link = player.currentSrc();
          if (!newLinks.includes(link)) { // check if current source is in newLinks array
            const index = videoPlayers.indexOf(player);
            videoPlayers.splice(index, 1); // remove player from array
            player.dispose(); // destroy player
          }
        });
        videoElements.forEach(videoElement => {
          const sourceElement = videoElement.getElementsByTagName('source')[0];
          if (sourceElement) {
            const link = sourceElement.getAttribute('src');
            if (!newLinks.includes(link)) { // check if current source is in newLinks array
              const index = videoElements.indexOf(videoElement);
              videoElements.splice(index, 1); // remove element from array
              videoElement.parentNode.removeChild(videoElement); // remove element from page
            }
          }
        });
        // loop through all players that are not in videoElements array
        for (const playerId in videojs.players) {
          const player = videojs.players[playerId];
          if (!videoPlayers.includes(player)) {
            player.dispose();
          }
        }
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
