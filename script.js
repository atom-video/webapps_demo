function loadHlsStreams(streams) {
  const videoContainer = document.querySelector('.video-container');
  videoContainer.innerHTML = '';

  streams.forEach((stream) => {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';
    videoContainer.appendChild(videoWrapper);

    const videoElement = document.createElement('video');
    videoElement.className = 'video-js';
    videoElement.controls = true;
    videoElement.preload = 'auto';
    videoWrapper.appendChild(videoElement);

    const player = videojs(videoElement);
    const source = {
      src: stream.url,
      type: 'application/x-mpegURL'
    };
    player.src(source);
  });
}

const streams = [
  { url: 'https://cdn-cache.platformcraft.ru/greenatom/kit/datarhei_stream.m3u8' },
  { url: 'https://cdn-cache.platformcraft.ru/greenatom/kit/datarhei_stream.m3u8' },
  // Add more streams as needed
];

window.addEventListener('DOMContentLoaded', () => {
  loadHlsStreams(streams);
});
