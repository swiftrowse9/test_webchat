const express = require('express');
require("dotenv").config();
const renderView = require('../models/database_function.js');
const {User_db} = require('../models/users_db.js');
const {Key_chat} = require('../models/users_db.js');



class chatController {

    chat = async (req,res, next)=>{

        console.log(req.query);

        renderView.render_database(User_db ,req, res , next, 'chat.cl7');
    }

    postChat = async (req,res, next)=>{

        res.render('chat.cl7');
    }

    getApiMessage = async (req, res, next)=>{
        
        try {

            const messages = await Key_chat.find();

            res.json(messages);

        } catch (error) {

            console.error(error);

            res.status(500).send('Server error');

        }
    }

    postApiMessage = async (req, res, next)=>{
        
        const { message, reply, command } = req.body;
        const messages = new Key_chat({ message, reply , command});

        try {

            const savedMessages = await messages.save();

            res.status(201).json(savedMessages);

        } catch (error) {

            console.error(error);

            res.status(500).send('Server error');
        }
    }
    show = async (req,res, next)=>{
       
        return res.send(`Chat detail <h2>${req.params.slug}</h2>`);
    }
}

module.exports = {
    
    chatPage : new chatController,
}

