require("dotenv").config();
const request = require('request');
const fs = require("fs");
const axios = require('axios');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const {Websocket_Connection} = require("../services/connect_websocket.js");
const data_msg = [];

class botFbController {

    index = async (req,res, next)=>{

        res.setHeader('Access-Control-Allow-Origin', process.env.HOSTNAME);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        // next();

        console.log("reload app");

        return res.send('bot page');
    }

  
}



let handlePostback = (sender_psid, received_postback) =>{

    let response;
    
    let payload = received_postback.payload;

    switch (payload) {

      case "no":

        response = { "text": "Cảm ơn!" }

      break;
      case "yes":

        response = { "text": "ohhh, cảm ơn vì bạn đã nhận xét <: " }

      break;
    
      default:
      break;
    }
    
    callSendAPI(sender_psid, response);
}

let handleMessage = (sender_psid, received_message) =>{

 
    let str = "";

    data_msg.push(Websocket_Connection.GetMessages());

    for(let i = 0; i < data_msg.length; i++) {
        
        str+=data_msg[i] + "\n";
    }

    let response;    
    
    if(received_message.text){

        response = {

          "text": `${received_message.text}`,
        }
    }

    if (received_message.text === "message") {   

        response = {

          "text": `${str}`,
        }
    }


    if(received_message.text==="#Tường"){

        response = {"text": `${received_message.text} : Tường nick name Clearlove7`,}

        console.log(response);
    }
    else if (received_message.attachments) {

      let attachment_url = received_message.attachments[0].payload.url;

      response = {
        
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "oh ảnh của bạn thật đẹp",
              "subtitle": "bạn có thấy nó đẹp không?",
              "image_url": attachment_url,
              "title":"cảm ơn vì đã gửi ảnh cho tôi ^^",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Có rất đẹp ((: !",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "Không đẹp chút nào !",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
    } 

    callSendAPI(sender_psid, response);   

}

let getWebhook = (req,res) =>{

  console.log('verify token : ',VERIFY_TOKEN)

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if(mode && token){

      if(mode === "subscribe"&&token === VERIFY_TOKEN){ 

          console.log("WEBHOOK_VERIFY");

          res.status(200).send(challenge);

      }else{

              res.sendStatus(403);
          }   
    }
}

let postWebhook = (req,res) =>{

    let body = req.body;
    console.log(body);

    if (body.object === 'page') {

        body.entry.forEach(function(entry) {

            console.table(entry);

            console.log("====================================================");

            console.table(entry.messaging);

            let webhook_event = entry.messaging[0];

            console.log('Event : ',webhook_event);


            let sender_psid = webhook_event.sender.id;

            console.log('Sender PSID : ' + sender_psid);

            
            if (webhook_event.message) {

                handleMessage(sender_psid, webhook_event.message);
            } 

            else if (webhook_event.postback) {

                handlePostback(sender_psid, webhook_event.postback);

            };
        });

        res.status(200).send('EVENT_RECEIVED');

    }
    
    else{

      res.sendStatus(404);
    }
}

let callSendAPI = (sender_psid, response)=> {

    let request_body = {

      "recipient": {

        "id": sender_psid
      },

      "message": response
    }
    
    request({
      //

      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body

    },(err, res, body) => {

        if (!err) {

          console.log('message sent!');//
        
        } else {

          console.error("Unable to send message:" + err);
        }
    });
}


module.exports = {
    bot_facebook : new botFbController,
    postWebhook,
    getWebhook
};












