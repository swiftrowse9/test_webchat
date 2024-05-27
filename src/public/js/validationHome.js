
function checkValidInput(e) {

    e.preventDefault();

    const username = document.querySelector('#username').value ? document.querySelector('#username').value.trim() : '';
    const room = document.querySelector('#room').value ? document.querySelector('#room').value.trim() : '';
    const invalid = /[@.!#$%^&*()_+=[\]{};'`:"\\|,<>/?]/;
    const characters = username.split('');
    const valid = true;
    const num_char_limited = 16;

    if (!username || !room) {
        alert('Tên của bạn không được phép chứa ký tự');
    } else if (invalid.test(username) || invalid.test(room)) {
        alert('Tên của bạn không được phép chứa ký tự');
    } else {
        if(characters.length > num_char_limited){
            alert(`Tên của bạn không được dài quá ${num_char_limited} ký tự !!!`);
        }
        
        window.location.href = `/chat?username=${username}&room=${room}`;
        
    }

    return valid;
}












