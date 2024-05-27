const express = require('express');
const csrf = require('csurf')
const cors = require('cors');
const {auth_api} = require('../controller/api/api_AuthController');
const {middleware_auth} = require('../middleware/middleware_auth');
const {middleware_verifyToken} = require('../middleware/middware_verifyToken');
const {csrfProtection} = require('../config/security/csrfSecurity');

class AuthRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){

        console.log("ENV: ",process.env.REACT_APP_HOSTNAME);

        this.router.get('/login',csrfProtection,middleware_auth.middlewareLogin,auth_api.index);
        this.router.post('/login',csrfProtection,middleware_auth.middlewareLogin,auth_api.login);

        this.router.get('/account',cors({
            origin: 'http://localhost:3000',
            methods: 'GET,POST,PUT,DELETE,OPTIONS',
            allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
            credentials: true,
            optionsSuccessStatus: 204,
            exposedHeaders: ['X-CSRF-Token'],
        }),middleware_verifyToken.middlewareVerify,auth_api.account);

        this.router.post('/register/store',cors({
            origin: 'http://localhost:3000',
            methods: 'GET,POST,PUT,DELETE,OPTIONS',
            allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
            credentials: true,
            optionsSuccessStatus: 204,
            exposedHeaders: ['X-CSRF-Token'],
        }),middleware_auth.middlewareRegister,auth_api.store);

        return this.router;
    }
}


module.exports = {
    
    AuthRoute : new AuthRoute,
};

