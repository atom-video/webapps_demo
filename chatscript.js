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
  chatInput.value = '';
  showTypingIndicator();
  }
  }