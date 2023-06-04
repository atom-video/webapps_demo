function loadHlsStreams(urls) {
    var playerContainer = document.getElementById('player-container');
  
    // Remove any existing players
    while (playerContainer.firstChild) {
      playerContainer.firstChild.dispose();
      playerContainer.removeChild(playerContainer.firstChild);
    }
  
    urls.forEach(function (url) {
      var videoElement = document.createElement('video');
      videoElement.className = 'video-js vjs-default-skin';
      videoElement.controls = true;
      playerContainer.appendChild(videoElement);
  
      var player = videojs(videoElement, {
        techOrder: ['html5', 'flash'],
        sources: [{ src: url, type: 'application/x-mpegURL' }]
      });
    });
  }
  