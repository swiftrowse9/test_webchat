const express = require('express');
const route = require('./web.js');
let router = express.Router();

let webSocketInit = (io) => {

  io.use((socket, next) => {
  
      try {

        const key = socket.handshake.headers.authorization;
        const clientKey = key ? key.split("Bearer ")[1] : null;

        if (clientKey === process.env.access_key) {

          console.log('Key is valid. Continuing with the connection.');
          next();

        } else {

          console.log('Unauthorized. Rejecting the connection.');
          throw new Error('Unauthorized');
        }
      } catch (error) {

        console.error("Socket authentication error:", error.message);
        
        next(new Error("Authentication error"));
      }
  });  
}

module.exports = {
    
    webSocketInit : webSocketInit
};