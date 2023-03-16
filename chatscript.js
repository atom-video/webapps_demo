const chat = document.getElementById('chat');
const chatInput = document.getElementById('chat-input');
const nameInput = document.getElementById('name-input');
let userName = '';

// Set focus on name input field when page loads
window.addEventListener('load', () => {
  nameInput.focus();
});

// Send message when "Enter" key is pressed in chat input field
chatInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleMessage();
  }
});

// Save user's name when "Enter" key is pressed in name input field
nameInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    userName = nameInput.value.trim();
    nameInput.disabled = true;
    chatInput.focus();
  }
});

// Display a new message in the chat interface
function displayMessage(message, sentByBot) {
  const div = document.createElement('div');
  div.classList.add('chat-message');
  if (!sentByBot) {
    const span = document.createElement('span');
    span.textContent = userName + ' says:';
    div.appendChild(span);
  }

  const p = document.createElement('p');
  p.textContent = message;
  div.appendChild(p);
  if (sentByBot) {
    div.classList.add('sent');
  }
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Process user's message and display a response from the chatbot
function handleMessage() {
  const message = chatInput.value.trim();
  if (message) {
    displayMessage(userName + ': ' + message, true);
    addMessageToChatHistory(userName, message);
    chatInput.value = '';
    showTypingIndicator();
  }
}

// Add message to chat history and save it to the server
function addMessageToChatHistory(name, message) {
  const timestamp = new Date().toLocaleString();
  const chatHistory = { name, message, timestamp };
  // write to volume
  fetch('/save-chat-history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chatHistory),
  })
  .catch(error => console.error('Error saving chat history:', error));
}

// Fetch and display chat history from server
function displayChatHistory() {
  // fetch chat history from volume
  fetch('/get-chat-history')
    .then(response => response.json())
    .then(data => {
      const chat = document.getElementById('chat');
      chat.innerHTML = '';
      data.forEach(({ name, message, timestamp }) => {
        const div = document.createElement('div');
        div.className = 'chat-message';
        const nameSpan = document.createElement('span');
        nameSpan.innerText = name + ':';
        const messageP = document.createElement('p');
        messageP.innerText = message;
        const timestampSpan = document.createElement('span');
        timestampSpan.innerText = timestamp;
        div.appendChild(nameSpan);
        div.appendChild(messageP);
        div.appendChild(timestampSpan);
        chat.appendChild(div);
      });
    })
    .catch(error => console.error('Error fetching chat history:', error));
}