const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
require("dotenv").config();
const path = require('path');
const morgan = require('morgan');

const configWebSocket =()=> {

    return {

        reconnection: true,
        reconnectionAttempts: Infinity, 
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000, 
        randomizationFactor: 0.5,

        cors:{

            allowedHeaders: ['Content-Type', 'Authorization'], 
            origin: process.env.ACCESS_ALL,
            methods: ["GET", "POST","PUT", "DELETE"],
        },
    }
}

let configViewEngine = (app, bodyParser, handlebars, SESSION_SECRET, SESSION_ALGORITHM) =>{

    app.use(cookieParser());

    app.use(session({

        secret: SESSION_SECRET,
        algorithm: SESSION_ALGORITHM,
        resave: false,
        saveUninitialized: true,
        cookie:{
            secure: false,
            httpOnly : true,
            sameSite: 'None', 
            maxAge: 60 * 60 *1000}
    }));

    app.use(cors({
        origin: 'http://localhost:3000',//process.env.REACT_APP_HOSTNAME 
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
        credentials: true,
        exposedHeaders: ['X-CSRF-Token'],
    }));


    app.use(flash());
    app.use(express.static("./src/public"));
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());    
    app.engine('cl7', handlebars.engine(
        {extname : '.cl7',}
    ));
    app.set('view engine','cl7');
    app.use(express.static("./src/views"));
    app.set("views", "./src/views");
}

module.exports = {
    
    configViewEngine : configViewEngine,
    configWebSocket : configWebSocket,
};

