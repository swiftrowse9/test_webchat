const express = require('express');
const moment = require('moment');


function formatData(id, username, text, room, status, countUsers, countMessages, automatic){
   

    return {
        
        id,
        username,
        text,
        room,
        status,
        countUsers,   
        countMessages,
        automatic,
        time : moment().format('h:mm a')
    };
    
}

module.exports = {formatData};
























