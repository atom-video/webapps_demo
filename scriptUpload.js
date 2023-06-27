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
  console.log(accessToken);
}

function uploadFile() {
  if (!accessToken || !ownerId) {
    alert('Access token not available. Please try again later.');
    return;
  }

  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file to upload.');
    return;
  }

  // Disable the upload button and display a message
  const uploadButton = document.getElementById('upload-button');
  const uploadMessage = document.getElementById('upload-message');
  uploadButton.disabled = true;
  uploadMessage.textContent = 'Uploading file...';

  // Get the filename from the user
  const filename = prompt('Enter a filename for the file:', file.name);
  if (!filename) {
    alert('Please enter a valid filename.');
    uploadButton.disabled = false;
    uploadMessage.textContent = '';
    return;
  }

  const url = 'https://api.platformcraft.ru/1/objects';

  const formData = new FormData();

  const data = {
    autoencoding: true,
    name: `kit/${filename}`,
    presets: '5676a27cf9cb101634000006,5676a27cf9cb101634000004'
  };
  formData.append('file', file);
  formData.append('data', JSON.stringify(data));
  formData.append('name', data.name); // Add the name field to the FormData object
  formData.append('autoencoding', data.autoencoding); // Add the autoencoding field to the FormData object
  formData.append('presets', data.presets); // Add the presets field to the FormData object

  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  request.send(formData);

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        uploadMessage.textContent = 'File uploaded successfully!';
      } else {
        uploadMessage.textContent = `Error uploading file: ${request.status} ${request.statusText}`;
      }
      uploadButton.disabled = false;
    }
  };

  request.onerror = function() {
    uploadMessage.textContent = 'Error uploading file.';
    uploadButton.disabled = false;
  };
}


document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const uploadMessage = document.getElementById('upload-message');
  fileInput.addEventListener('change', uploadFile);
  uploadButton.addEventListener('click', uploadFile);
  getAccessToken();
});
