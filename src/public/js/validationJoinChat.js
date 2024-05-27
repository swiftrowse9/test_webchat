document.querySelector("#chatpage").addEventListener("click", function(e){
    var user = undefined;
    var roomname = undefined;
   
});
function checkValidChatPage(e,username,room) {

    e.preventDefault();
    let valid = true;

    if (!username || !room) {
        alert('ban phai nhap ten truoc khi vao room chat');
    }else{
        valid = true;
    }

    return valid;
}










