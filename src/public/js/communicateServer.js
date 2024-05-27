import { render_List , darkmode} from "./clientRendering.js";
const socket = io();
const CoinID = document.getElementById('coin');
let lastPrice = 0;

darkmode();


socket.on('connect',resource => {

    resource = socket.id;

    console.log(resource);
});


socket.on('coin',async coin => {

    if(coin.price > lastPrice){

        try {

            CoinID.className = 'up';

            lastPrice = coin.price;

            document.getElementById('coin').innerHTML = `${coin.price} USD tăng mạnh`;

        } catch (error) {

            return;
        }
        
    }else{

        CoinID.className = 'down';
        
        lastPrice = coin.price;

        document.getElementById('coin').innerHTML = `${coin.price} USD lao dốc không phanh`;
    }
    

    
});


socket.on('company_api',async company => {


    
});
