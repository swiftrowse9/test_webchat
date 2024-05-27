require("dotenv").config();
const {User,Admin} = require("../../models/users_db");
const bcrypt = require("bcryptjs");
const JOI = require("joi");

class api_AuthController {


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

    index = async (req, res, next) => {

     
      this.csrfToken = req.csrfToken();

      console.log("New csrf token: ", this.csrfToken);

      return res.status(200).send({
        
          csrf: this.csrfToken,
      });
    }

    getCsrfTokenGenerate = async ()=>{

      return this.csrfToken;
    }

    account = async (req, res, next) => {

      return res.status(200).send({
        
        message: "Login success",
      });
    }

    login = async (req, res, next) => {

        try {

          const admin = await Admin.findOne({ email: req.body.data.email });

          if(admin){

              const result = await Admin.updateOne(
                { email: admin.email },
                { $set: { is_online: 1 } }
              );
  
              console.log(`Đã cập nhật ${result.modifiedCount} bản ghi`);
              console.log("Admin login: ", admin);

              const token = admin.generateAuthToken();

              res.cookie('token', token, {
                  sameSite: 'none',
                  path: '/',
                  //maxAge: 60*1000,
                  httpOnly: true,
                  secure: true
              });

          
              res.status(200).send({
                  data: token,
                  email: admin.email,
                  username: `${admin.firstName} ${admin.lastName}`,
                  role_admin: true,
                  message: "Đăng nhập thành công",
              });

            }else{

              const user = await User.findOne({ email: req.body.data.email });
              const result = await User.updateOne(
                { email: user.email },
                { $set: { is_online: 1 } }
              );
  
              console.log(`Đã cập nhật ${result.modifiedCount} bản ghi`);
              console.log("User login: ", user);

              const token = user.generateAuthToken();
          
              res.cookie('token', token, {
                  sameSite: 'none',
                  path: '/',
                  httpOnly: true,
                  secure: true
              });

              res.cookie('username', `${user.firstName} ${user.lastName}`, {
                  sameSite: 'none',
                  path: '/',
                  maxAge: 60*1000,
                  secure: true
              });

              res.cookie('email', user.email, {
                  sameSite: 'none',
                  path: '/',
                  maxAge: 60*1000,
                  secure: true
              });
          
              res.status(200).send({
                  data: token,
                  email: user.email,
                  username: `${user.firstName} ${user.lastName}`,
                  message: "Đăng nhập thành công",
              });
          }

        } catch (error) {

            console.log("Login Server Error: ",error);

            res.status(500).send({ 

                message: "Internal Server Error!" + error
            });
        }
    }
  

    store = async (req, res, next)=>{
          
        try{

            const salt = bcrypt.genSaltSync(Number(process.env.SALT));
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            const isPasswordValid = bcrypt.compareSync(req.body.password, hashPassword);
            await new User({ ...req.body, password: hashPassword }).save();
      
            res.status(201).send({ 
          
                message: "User created successfully"
            });

        }catch (error){

            console.log("Register Server Error: ",error);

            res.status(500).send({ 

                message: "Internal Server Error!" + error
            });
        }
    }

}

module.exports = {
  
  auth_api : new api_AuthController,
}
