const headers = new Headers();
headers.append('Authorization', 'Bearer eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwibmFtZSI6ImdyZWVuYXRvbSIsImdyb3VwIjoiIiwib3duZXJfbmFtZSI6ImdyZWVuYXRvbSIsInBlcm1pc3Npb25zIjp7IkNETl9zdGF0IjpbeyJpZCI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsIm93bmVyIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwicmlnaHRzIjo3LCJhZHZhbmNlZCI6bnVsbH1dLCJGaWxlc3BvdCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiSWRlbnRpdHkgU2VydmljZSI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiUmVjb3JkZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjp7InNpbXVsdF9saW1pdCI6M319XSwiU3RyZWFtUHVibGlzaCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiU3RyZWFtZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV0sIlRyYW5zY29kZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV19LCJzdXBlciI6ZmFsc2UsImV4cCI6MTY4NjIzMjUxOCwiaWF0IjoxNjg2MTQ2MTE4LCJpc3MiOiJhdXRoLnBsYXRmb3JtY3JhZnQucnUifQ.AJ0rtsa4LW3GBxhD2mZKeKkTaeR0PI8x88c0Iegpodgh2HBGQDW9u7vtqoikp_GgY3yaGos36sV3ENmiZp0Fpi7jucpiJi4qbh2BPmHHmqxla5Gjah5zBval7yMblyV4Fp09i7UepRwBcmnnPx7MRpXuti9UfsAjncsvZFfpu7Be35BcMb3xt8sfXmns7KKy3TMbNVeu4PTbr1yuJTSltofjdBYlXLU0jD1kI2D1JDpWYnWsiqNa32cFcZfYMMLC1oOUi_hm7VAUDJIdSJgJ0h05HGJH7R2kV3QMBvHlMf-XCByy9Rt6JdvtcsuzXW5ZwPwxP6UzNfzx-4-icqqEQQ');

const init = {
  method: 'GET',
  headers
};

let currentLinks = []; // keep track of current links
let videoElements = []; // keep track of video elements
let videoPlayers = []; // keep track of video players

function updateStreams() {
  fetch('https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit', init)
    .then(response => response.json())
    .then(data => {
      const newLinks = data.contents.map(link => ('https://' + link.download_url));
      const changedLinks = newLinks.filter((link, index) => link !== currentLinks[index]);
      if (changedLinks.length > 0) { // only update if links have changed
        currentLinks = newLinks;
        const videoContainer = document.getElementById('video-container');
        const existingVideoElements = Array.from(videoContainer.getElementsByTagName('video'));
        const existingLinks = existingVideoElements.map(videoElement => videoElement.getElementsByTagName('source')[0].getAttribute('src'));
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
          if (!changedLinks.includes(link)) {
            const index = videoPlayers.indexOf(player);
            videoPlayers.splice(index, 1); // remove player from array
            player.dispose(); // destroy player
          }
        });
        videoElements.forEach(videoElement => {
          const link = videoElement.getElementsByTagName('source')[0].getAttribute('src');
          if (!changedLinks.includes(link)) {
            const index = videoElements.indexOf(videoElement);
            videoElements.splice(index, 1); // remove element from array
            videoElement.parentNode.removeChild(videoElement); // remove element from page
          }
        });
      }
    });
}

updateStreams(); // fetch streams once on page load

setInterval(updateStreams, 10000); // update streams every 10 seconds
