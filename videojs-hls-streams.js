function loadHlsStreams() {
  fetch('https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwibmFtZSI6ImdyZWVuYXRvbSIsImdyb3VwIjoiIiwib3duZXJfbmFtZSI6ImdyZWVuYXRvbSIsInBlcm1pc3Npb25zIjp7IkNETl9zdGF0IjpbeyJpZCI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsIm93bmVyIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwicmlnaHRzIjo3LCJhZHZhbmNlZCI6bnVsbH1dLCJGaWxlc3BvdCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiSWRlbnRpdHkgU2VydmljZSI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiUmVjb3JkZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjp7InNpbXVsdF9saW1pdCI6M319XSwiU3RyZWFtUHVibGlzaCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiU3RyZWFtZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV0sIlRyYW5zY29kZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV19LCJzdXBlciI6ZmFsc2UsImV4cCI6MTY4NjA0ODM2NSwiaWF0IjoxNjg1OTYxOTY1LCJpc3MiOiJhdXRoLnBsYXRmb3JtY3JhZnQucnUifQ.d9Tw874r-iDWVpk05zZxGRAj1Ug6yXm3YIKO7A2nGWIhl33rO-B1zOlltTzwtsfOcXvsQh0oESjm_uVViLfUsmLy0siW3BEknyFLG-hsshy9pQG4-tO0-Hp6hsPYrVTOEJdpHmC9ADO55dq2W1s4zcqX0dS0bqz_w9wclg1FrgF_bSUn2cmXZ5cyIPlcavuZzXVHEUWvcR60WUkX-dLr_-dH7v_84iLFA3NVA38tlI4XFYAYmQdfCGpi15T4pMHMY9xjuKcSilTSgO2KvEmN4WvP7tcEW7pk0uUX_vE8ecjTza0EZS-a10sBM7Y0WiJLuG6NyclPZ9w6mX-aZDY0FQ'
    }
  })
    .then(response => response.json())
    .then(data => {
      const linkList = data.contents.map(link => link.download_url);
      console.log(linkList);
      
      // Display the video players
      linkList.forEach((link, index) => {
        const playerId = `player${index + 1}`;
        const videoContainer = document.createElement('div');
        videoContainer.id = playerId;
        videoContainer.classList.add('video-container');
        document.getElementById('players-container').appendChild(videoContainer);
        
        const playerOptions = {
          controls: true,
          autoplay: false,
          fluid: true,
          sources: [
            {
              src: 'https://'+ link,
              type: 'application/x-mpegURL'
            }
          ]
        };
        
        videojs(playerId, playerOptions);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

window.addEventListener('DOMContentLoaded', loadHlsStreams);
