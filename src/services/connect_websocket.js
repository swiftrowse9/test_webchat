const encoding = require('./encoding.js');
const axios = require('axios');
const {API} = require('./api.js');
const {userJoin, getUsers, usersLeaveRoom, getRoomUsers} = require('../models/users.js');
const speaking = require('say');
const { gtts } = require('google-tts-api');
const {User_db} = require('../models/users_db.js');
const {formatData} = require('./messages.js');
const {bot} = require('./chatBot.js');
require('dotenv').config();


class Websocket_Connection{

    constructor() {

        this.guest = null;
        this.role = null;
        this.countUsers = 0;
        this.countMessages = 0;
        this.message=null;

    }

    connectWebChat = (io) =>{

        let guest = this.guest;
        let role = this.role;
        let countUsers = this.countUsers;
        let countMessages = this.countMessages;

        io.on('connection',socket => {   
            
            console.log("User connected " + socket.id);
           
            socket.on('joinRoom', ({username, room}) => {
                
                ++countUsers;

                // console.log(`${socket.id} connect to the page chat`);
    
                switch (username) {

                    case 'tuong':case 'thao':case 'tuongclearlove7':case 'hiii':

                        role = `<span style='color:rgb(23 140 234);font-weight:bold;'>Admin</span> ${username}`;
                        guest = username;

                    break;

                    default:

                        role = `<span style='color:#008216;font-weight:bold;'>User</span> ${username}`;
                        guest = username;

                    break;
                }
                const user = userJoin(socket.id,role, room);

                socket.join(user.room);
               
                const Obj_user = formatData(user.id , username, `${username} has joined the webchat`, user.room,  "joined the webchat", countUsers, countMessages, null);
                
                if(Obj_user.countUsers > 1){

                    Obj_user.countMessages = 0;
                }

                socket.emit('message', Obj_user);
                socket.broadcast.to(user.room).emit('message', Obj_user);
         
                console.table(Obj_user);

                io.to(user.room).emit('roomUsers', {room : user.room,users : getRoomUsers(user.room)});
    
            });
    
            socket.on('chatMessage', async msg => {

                const user = getUsers(socket.id);

                this.message = `${guest} tại phòng ${user.room} vừa nhắn tin ${msg}`;
    
                bot.findKeyChat().then(async () => {
            
                    const automatic = bot.handleAutoMsg(msg);
    
                    automatic.then(autoMsg => {
    
                        ++countMessages;
                        
                        const obj_user = formatData(user.id, guest, msg, user.room, "sending", countUsers, countMessages, autoMsg);
    
                        console.table(obj_user);

                        io.to(user.room).emit('message', obj_user);
                    });
                });
            });
        
            socket.on('disconnect',() => {
        
                const user = usersLeaveRoom(socket.id);
    
                if(user){
                   
                    --countUsers;
                   
                    if(countUsers == 0) countMessages=0;
                    io.to(user.room).emit('message',
    
                    formatData(user.id, user.room, `${guest} has left the webchat`, user.room,'out webchat', countUsers, countMessages, null));
                    
                    console.table(formatData(user.id, guest,  `${guest} has left the webchat`,  user.room, 'out webchat', countUsers, countMessages, null));
                    
                    io.to(user.room).emit('roomUsers', {room : user.room,users: getRoomUsers(user.room)});
                }
            });
        });

    
    }

    connectToClient = (io) =>{
 
        io.on('connection', (socket) => {

            //  console.log(socket.id + " websocket connection..."); 

            socket.on('disconnect', () => {

                console.log(`${socket.id} disconnect to server`);
            });
    
             const coin = async () =>{

                while (true) {

                    const price = 31750 + Math.random() * 400;
                    let Coin ={ 
                        
                        price : parseFloat(price.toFixed(2))
                    };

                    socket.emit('coin',Coin);

                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
            coin();


            const companyAPI = async () =>{


                await User_db.find({}).then(async (data) => { 

                    socket.emit('company_api', data);

                }).catch(err =>{

                    console.log("DB Buffering timed out after 10000ms");
                })
            }

            companyAPI();
        
           
        });
    }

    GetMessages = ()=> {

        return this.message;
    }


}



module.exports = {

    Websocket_Connection : new Websocket_Connection
};


