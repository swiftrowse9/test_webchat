const mongoose = require('mongoose');
require('dotenv').config();

class database_connection{

    async connectDB(string_connection){
    
        await mongoose.connect(string_connection, 
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        }).then(res => 
            
            console.log('connect successfully')
        
        ).catch(err => 

            console.log('connect failed : ', err));
    }
}


module.exports = {

    database_connection : new database_connection,
};

































