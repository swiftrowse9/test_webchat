const express = require('express');
const csrf = require('csurf');
const cors = require('cors');
const {admin} = require('../controller/AdminController');
const {middleware_admin} = require('../middleware/middleware_admin');
const {csrfProtection} = require('../config/security/csrfSecurity');

class AdminRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){


        this.router.get('/list-users',middleware_admin.middlewareAuthListUsers,admin.index);
        this.router.post('/register/store',middleware_admin.middlewareAuthCreateAdmin,admin.store);

        return this.router;
    }
}


module.exports = {
    
    AdminRoute : new AdminRoute,
};

