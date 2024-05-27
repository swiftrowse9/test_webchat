import { sendMessage, autoSend, asyncCallAutoMsg} from "./clientRendering.js";
const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const usersName = document.querySelector('#users');
const countUser = document.querySelector('#countUsers');

const {username, room} = Qs.parse(location.search, {

     ignoreQueryPrefix: true
});

socket.emit('joinRoom',{username, room});

socket.on('roomUsers', function user({room,users}){

    getRoom(room);
    clientGetUsers(users);
    userWelcome();
});


function clientGetUsers(users){

    usersName.innerHTML = `${users.map(user =>

        `<li>${user.username}</li>`).join(" ")
    }`;    
}

function getRoom(room){

    roomName.innerHTML = `${room}`;
}

function userWelcome(){

    const keywords = [

        'hello',
        'crush',
        "weather",
        'hi',
        'what is your name?',
        'covid',
        'company',
        'giá coin'
    ];

    
    document.querySelector('.welcome-webchat').innerHTML = 
    `<span><br><b>HELLO ${username.toUpperCase()}</b> WELCOME TO WEBCHAT</span>
    <br>
    <b>You can test the bot by messaging the following keywords into the chat:</b>
    <br>
    <div class="list-keyword">
    ${scan_keywords(...keywords)}
    </div>
    
    `;
}


socket.on('message',async message => {

    console.log(message);
    countUser.innerHTML = message.countUsers;
    sendMessage(message);
    await asyncCallAutoMsg(message, message.automatic); 
});


chatForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const msg = e.target.elements.text.value;
    socket.emit('chatMessage',msg); 
    e.target.elements.text.value = ''; 
    e.target.elements.text.focus(); 
    
});



function scan_keywords(...keywords) {

    let str = "";

    for (var i = 0; i < keywords.length; i++) {

        if (i < keywords.length) {

            str += `<li>${keywords[i]}</li>`;
        }
    }

    return str;
}

