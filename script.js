const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

let chatHistory = [];

fetch('https://kiiimfu-chat-backend.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: "Hello", history: []})
        })
        .then(response => response.json())
        .then(data => {
            msg.innerHTML += `<div class="msg-bot">${data.response}</div>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });

// Function to toggle the chat box
function toggleChat() {
    const msg = document.getElementById('chat-messages');

    const chatbox = document.getElementById('chat-window');
    chatbox.classList.toggle('open');

    // provoke render before input
    if(chatbox.classList.contains('open')){
        msg.innerHTML += `<div class="msg-bot" id="sayhi">Hiiii, welcome to Kimberly's Website! What you wanna know about me? The website it's currently rendering from Cohere API it might take a while!</div>`;
    }
}

// Function to :
// 1. Grab chat (input) value
// 2. Display user's message in #chat-messages
// 3. Clear the input field
// 4. Call Render (on cohere api) with fetch() send {message:userMessage, history:chatHistory}
// 5. Display "response" in #chat-messages as a new div
function sendMessage(){
    // 1
    const chatinput = document.getElementById('chat-input');
    const userMessage = chatinput.value.trim();
    if(userMessage === "") return; 

    // 2
    const msg = document.getElementById('chat-messages');
    msg.innerHTML += `<div class="msg-user">${userMessage}</div>`;

    // 3
    chatinput.value = "";

    // place holder showing your message is being processed
    msg.innerHTML += `<div class="msg-bot" id="thinking">Thinking...</div>`;

    // 4
    fetch('https://kiiimfu-chat-backend.onrender.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: userMessage, history: chatHistory})
    })
    .then(response => response.json())
    .then(data => {
        // 5
        document.getElementById('thinking').remove();
        msg.innerHTML += `<div class="msg-bot">${data.response}</div>`;
        chatHistory.push({role: 'user', content: userMessage},
            {role: 'assistant', content: data.response}
        );
    })
    .catch(error => {
        console.error('Error:', error);
    });
}   


