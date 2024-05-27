const express = require('express');
const readline = require('readline');
const {Admin,User} = require("../models/users_db");
require('dotenv').config();

class middleware_admin {

    constructor() {
       
    }

    middlewareAuthListUsers = async (req, res, next) => {

        const accessKey = req.get('Authorization');

        if(accessKey){

            next();

        }else{
            
            return res.status(403).send({ 

                message: 'Bạn không có quyền truy cập!!!' 
            });
        }
    }


    middlewareAuthCreateAdmin = async (req, res, next)=> {

        if(req.body.access_token === process.env.PAGE_ACCESS_TOKEN){

            const admin = await Admin.findOne({ email: req.body.email });
            const user = await User.findOne({ email: req.body.email });

            if(await admin) {

                console.log(409, "Trung email voi tai khoan admin!!!");
      
                return res.status(409).send({
    
                    message:"Trung email voi tai khoan admin!!!"
                });
            }
            
            if(await user){

                console.log(409, "Trung email voi tai khoan user!!!");
      
                return res.status(409).send({
    
                    message:"Trung email voi tai khoan user!!!"
                });
            }

            next();

        }else{

            console.log(401, "create account failed!!!");

            res.status(401).send({

                error: 'UnAuthorized'
            });
        }
    }

}

module.exports = {
    
  middleware_admin : new middleware_admin,
}