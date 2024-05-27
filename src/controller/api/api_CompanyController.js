const {User_db,Title_web, User_send_message, Account} = require('../../models/users_db.js');
const renderView = require('../../models/database_function.js');
require("dotenv").config();


class api_CompanyController {

    index = async (req, res, next)=>{
          
        User_db.find({}).then(async (data) => { 
          
          data = await data.map(res => res.toObject());

          res.status(200).send(data);

        }).catch(err =>{

            res.status(500).render('index.cl7');
        });
    }
}

module.exports = {
  
  company_api : new api_CompanyController,
}
