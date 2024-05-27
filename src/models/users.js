
const users = [];
const emails = [];

function userJoin(id, username, room){

    const user = {id, username, room};
    
    users.push(user);

    return user;
}

function userEmailJoin(id, email, room){

    const user = {id, email, room};
    
    emails.push(user);

    return user;
}

function getUsers(id){

    return users.find(user => user.id === id);

}

function getEmails(id){

    return emails.find(user => user.id === id);

}



function usersLeaveRoom(id){

    const index = users.findIndex(user => user.id === id);

    if(index !== -1){ 
        
        return users.splice(index, 1)[0];
    }
}

function usersEmailLeaveRoom(id){

    const index = emails.findIndex(user => user.id === id);

    if(index !== -1){ 
        
        return emails.splice(index, 1)[0];
    }
}

function getRoomUsers(room){

    return users.filter(user => user.room === room);
}

function getRoomEmailUsers(room){

    return emails.filter(user => user.room === room);
}

module.exports = {

    userJoin,
    getUsers,
    getEmails,
    usersLeaveRoom,
    getRoomUsers,
    userEmailJoin,
    usersEmailLeaveRoom,
    getRoomEmailUsers
};


































































