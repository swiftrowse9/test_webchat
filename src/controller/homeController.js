const express = require('express');
const fs = require('fs');
const renderView = require('../models/database_function.js');
const {render_toObjDB, render_list_database} = require('../models/database_function.js');
const {User_db,Title_web, User_send_message, Account} = require('../models/users_db.js');

class homeController {
    
    constructor(username, password) {

        this.username = username;
        this.password = password;
    }

    index = async (req, res, next)=>{
        
         renderView.render_database(User_db ,req, res , next, 'index.cl7');

        // return res.sendStatus(200);
    }
    
    postHome = async (req, res, next)=>{
    
      
    }

    shop = async (req,res, next)=>{
  
        renderView.render_database(User_db ,req, res , next, 'shop.cl7');

    }

    contact = async (req,res, next)=>{
       
        renderView.render_database(User_db ,req, res , next, 'contact.cl7');
    }

    postcontact = async (req, res, next) => {

        const finished = (err) => {

          if (err) {

            console.error(err);

            return next();
          }
        };
      
        const jsonData = req.body;
        const existingData = fs.readFileSync('data.json', 'utf-8');
        const data = JSON.parse(existingData);

        data.home.push(jsonData);
        fs.writeFile('data.json', JSON.stringify(data), finished);
        console.log(data);
        
        renderView.render_database(User_db, req, res, next, 'contact.cl7');
    }

    message = async (req,res, next)=>{
       
        renderView.render_database(User_send_message ,req, res , next, 'message.cl7');
    }

    postmessage = async (req,res, next)=>{
       
        console.log(req.body.msg);

        renderView.render_database(User_send_message ,req, res , next, 'message.cl7');
    }

    create = async (req, res, next)=>{
        
        renderView.render_database(User_db ,req, res , next, 'show/create.cl7');
    }

    postStore = async (req, res, next)=>{
 
        try{

            const data = new User_db(req.body);
       
            data.save();

            res.redirect('/company');

        }catch(err){

            res.send({

                "message":err
            });
        }
    }

    login = async (req, res, next)=>{

        Account.find({}).then(data => { 

                const users = render_list_database(data);

                users.forEach(user =>{
                   
                });

            }).catch(err =>{next(err);
        });

       res.render('show/login.cl7');
    }


    loginSuccess = async (res,user)=>{
       
        setTimeout(function(){

            res.render('./show/account.cl7',{

                user : render_toObjDB(user)
            });

        },2000);
    }

    getApiLogin = async (req, res, next)=>{

        try {

            const accounts = await Account.find();

            res.json(accounts);

        } catch (error) {

            console.error(error);

            res.status(500).send('Server error');
        }
    }

    postApiLogin = async (req, res, next)=>{
        
        const { username, password } = req.body;
        const account = new Account({ username, password });
    
        try {

            const savedAccount = await account.save();

            res.status(201).json(savedAccount);

        } catch (error) {

            console.error(error);

            res.status(500).send('Server error');
        }
    }

   
    
    postLogin = async (req, res, next)=>{

        const input_user = req.body;
        const account = new Account(input_user);
        
        Account.findOne({username :  input_user.username})

                .then(user => { 

                    req.session.user = {

                        username : user.username,
                    }
                    console.log(req.session);
                   

                    this.username = user.username;

                    if(user.password === input_user.password){

                        this.loginSuccess(res,user);
                    }
                    else{

                        res.render('./show/login.cl7',{

                            fail : 'Xin lỗi vì điều này bạn đã login thất bại!'
                        });
                    }   
            }).catch(err =>{
             
                res.render('./show/login.cl7',{

                    fail : 'Xin lỗi vì điều này bạn đã login thất bại'
                });
        });
    }

    account = async (req, res, next)=>{

        var user = {username : this.username};

        Account.findOne({})

            .then(myuser => {

                res.render('show/account.cl7', {

                    user
                });

            }).catch(err =>{next(err);
        });
    }

    show = async (req,res, next)=>{

        User_db.findOne({slug: req.params.slug})

            .then(data => { 

                res.render('show/show.cl7', {

                    data : render_toObjDB(data)

                });

            }).catch(err =>{next(err);
        });
    }
}

module.exports = {

    homePage : new homeController,
}