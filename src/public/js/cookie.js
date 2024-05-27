const username = 'name=tuong';
document.cookie = username;

var key = "tuong";
var value = "tuong";

switch (key) {
    
    case value:

        console.log("tuong");

        break;

    default:

        break;
}


async function companyAPI(){
    
    let data  = await fetch(`https://web-chat.up.railway.app/company-api`)

    .then(
        
        res=>{

            return res.json();
        }

    ).catch(function(error) {

        console.log("error");
    });
        
}


companyAPI();









































































