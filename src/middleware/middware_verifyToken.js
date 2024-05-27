const {User, Admin, validate} = require("../models/users_db");
const express = require('express');
const readline = require('readline');
const JOI = require("joi");
const jwt = require('jsonwebtoken');
require('dotenv').config();


class middleware_verifyToken {

    constructor() {
       
    }


    middlewareVerify = async (req, res, next)=> {

        try {

          jwt.verify(req.cookies.token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
            
              if (err) {

                await Admin.updateOne(
                    { email: req.cookies.email },
                    { $set: { is_online: 0 } }
                );

                await User.updateOne(
                    { email: req.cookies.email },
                    { $set: { is_online: 0 } }
                );

                console.log("Token hết hạn đăng xuất!!!");

                return res.status(401).send({

                    message: 'Hết hạn đăng nhập!\nToken không hợp lệ!',
                });
              }
              
              req.user = decoded;
              next();

          });
          
        } catch (error) {

            console.log("Verify Server Error: ",error);
          
            res.status(500).send({ 

                message: "Internal Verify Server Error!" + error
            });
        }
    }

}

module.exports = {
    
  middleware_verifyToken : new middleware_verifyToken,
}