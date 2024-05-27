const express = require('express');
const {chatPage} = require('../controller/chatController');
const {middleware} = require('../middleware/middleware');

class ChatRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){

        this.router.get('/', middleware.middlewareChat,chatPage.chat);
        this.router.post('/', chatPage.postChat);

        return this.router;

    }
}

module.exports = {

    ChatRoute : new ChatRoute
};
