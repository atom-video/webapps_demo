const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const status = document.getElementById('status');
let accessToken = null;
let ownerId = null;

function getAccessToken() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    const response = JSON.parse(e.target.responseText);
    accessToken = response.access_token;
    ownerId = response.owner_id;
  });
  xhr.addEventListener('error', function(e) {
    console.error('Request errored with status', e.target.status);
  });
  xhr.open('POST', 'https://auth.platformcraft.ru/token');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  const body = 'login=greenatom&password=123123'; // replace with your own login and password
  xhr.send(body);
}

function uploadFile() {
  const file = fileInput.files[0];
  if (!file) {
    status.textContent = 'Please select a file to upload.';
    return;
  }

  const formData = new FormData();
  const filename = fileInput.files[0].name; // get the name of the file
  formData.append('file', fileInput.files[0], filename);

  const boundary = Math.random().toString().substr(2);
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + accessToken);
  headers.append('Content-Type', `multipart/form-data; boundary=${boundary}`);

  const init = {
    method: 'POST',
    headers,
    body: formData
  };

  const path = 'kit'; // replace with your own file path
  console.log(ownerId);
  fetch(`https://filespot.platformcraft.ru/2/fs/container/${ownerId}/object/${path}/${filename}`, init)
    .then((response) => {
      if (response.ok) {
        status.textContent = 'File uploaded successfully!';
      } else {
        status.textContent = `Error uploading file: ${response.statusText}`;
      }
    })
    .catch((e) => {
      status.textContent = `Error uploading file: ${e.message}`;
    });
}

getAccessToken();
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!accessToken) {
    status.textContent = 'Access token not available. Please wait a moment and try again.';
    return;
  }
  uploadFile();
});
