const express = require('express');
const readline = require('readline');
require('dotenv').config();

class middleware {

    constructor() {
       
    }

   
    middleware1 = async (req, res, next)=>{

        if(['tuong', 'thao'].includes(req.query.user)){

            req.user2 = 'ThaoRose9';

            return next();
        }
        res.status(403).json({

            message:'Access denied'
        });
    }
    middleware2 = async (req, res, next)=>{

        res.status(403).json({

            user1:'TuongClearlove7',
            user2: req.user2,
        });
    }

    middlewareCreate = async (req, res, next)=> {

        if(req.query.join === 'admin'){

            return next();
        } 

        console.log("Khong duoc phep vao trang create!!!");

        res.status(401).render('index.cl7');
    }



    
     middlewareChat = async (req, res, next) => {
        
        const username = req.query.username ? req.query.username.trim() : '';
        const room = req.query.room ? req.query.room.trim() : '';
        const invalid = /[@.!#$%^&*()_+=[\]{};'`:"\\|,<>/?]/;
        const characters = username.split('');
        
        if (!username || !room) {

            res.render('index.cl7');

        } else if (invalid.test(username) || invalid.test(room)) {

            res.render('index.cl7');

        } else {

            if(characters.length < 16){

                return next();

            }else{

                res.render('index.cl7');
            }
        }
    };

}

module.exports = {
    
    middleware : new middleware,
}