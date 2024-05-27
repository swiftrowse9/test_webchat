require("dotenv").config();
const {Admin, User} = require("../models/users_db");
const bcrypt = require("bcryptjs");
const JOI = require("joi");

class adminController {


    constructor() {

      this.csrfToken = null;
    }
  
    validate = (data) =>{

      const schema = JOI.object({

          email: JOI.string().email().required().label("Email"),
          password: JOI.string().required().label("Password"),
      });

      return schema.validate(data);
    }

    index = async (req, res, next) =>{

      try {
        const dataAdmin = await Admin.find({});
        const dataUser = await User.find({});
    
        const adminDataObject = dataAdmin.map(res => res.toObject());
        const userDataObject = dataUser.map(res => res.toObject());
    
        res.status(200).send({
            admin: adminDataObject,
            user: userDataObject
        });
      } catch (error) {
        
        console.error(error);
        res.status(500).render('index.cl7');
      }
    }


    store = async (req, res, next)=>{
            
        try{
            const salt = bcrypt.genSaltSync(Number(process.env.SALT));
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            const isPasswordValid = bcrypt.compareSync(req.body.password, hashPassword);
            await new Admin({ ...req.body, password: hashPassword }).save();

            console.log("Tao thanh cong mot tai khoan admin");

            res.redirect('/create?join=admin');

        }catch (error){

            console.log("Admin Register Server Error: ", error);

            res.status(500).send({ 

                message: `Admin Register Server Error: ${error}`
            });
        }
    }

}

module.exports = {
  
  admin : new adminController,
}
