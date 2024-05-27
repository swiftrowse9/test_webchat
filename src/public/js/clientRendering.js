function render_List(class1, class2, obj){
    
    const div = document.createElement('div');

    div.classList.add(class2);
    div.innerHTML = `${obj}`; 

    document.querySelector(class1).appendChild(div);
}

function sendMessage(message) {

    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`; 

    document.querySelector('.chat-messages').appendChild(div);
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;
}

async function autoSend(message, auto_send) {
    
    const div = document.createElement('div');

    div.classList.add('auto-message');
    div.innerHTML = `<p class="auto">${"Bot"} <span>${message.time}</span></p><p class="text-auto"></p>`;


    document.querySelector('.chat-messages').appendChild(div);
  
    const autoMessage = div.querySelector('.text-auto');

    
    let i = 0;
    let run = true;

    const renderText = () => {
        
        if (i < auto_send.length && run) {

            autoMessage.textContent += auto_send[i];

            i++;

            setTimeout(renderText, 50);
        }

        if (i < auto_send.length && run) {

            autoMessage.textContent += auto_send[i];

            i++;

            setTimeout(renderText, 50);
        }
     
    };
    
     renderText();
  
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;
}
  

function asyncCallAutoMsg(message,msg_auto) {

    return new Promise(resolve => {

        setTimeout(() => {
           
            if(msg_auto === '' || msg_auto === null || msg_auto === undefined)
            {
                return;
            }
            else{

                autoSend(message,msg_auto);
            }
        }, 500);   
    });
}


function darkmode(){

    let isDarkMode = false;
    const toggleThemeBtn = document.getElementById('light_dark');
     
    toggleThemeBtn.addEventListener('click', () => {
        
        if (isDarkMode) {

            document.body.style.backgroundColor = "#1d1f21";
            document.body.transition = 'all 1s ease';
        } 
        else {
           
            document.body.style.backgroundColor = "white";
            document.body.transition = 'all 1s ease';
        }

        isDarkMode = !isDarkMode; 
    });
}   

export{
    
    render_List,
    sendMessage,
    autoSend,
    asyncCallAutoMsg,
    darkmode
}










