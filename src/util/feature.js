const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

async function notifiAlert(){

    io.on('connection', (socket) => {

        socket.emit("alert","thong bao!!!");
    });
}


module.exports = {
    
    notifiAlert : notifiAlert
};




















