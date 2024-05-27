const express = require('express');
const {homePage} = require('../controller/homeController');
const {middleware} = require('../middleware/middleware');

class HomeRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){

      this.router.get('/company',homePage.shop);
      this.router.get('/contact', homePage.contact);
      this.router.get('/message', homePage.message);
      this.router.get('/apiLogin', homePage.getApiLogin);
      this.router.get('/create', middleware.middlewareCreate, homePage.create);
      this.router.get('/login', homePage.login);
      this.router.get('/account', homePage.account);
      this.router.get('/:slug', homePage.show);
      this.router.get('/', homePage.index);
      this.router.post('/', homePage.postHome);
      this.router.post('/contact', homePage.postcontact);
      this.router.post('/message', homePage.postmessage);
      this.router.post('/company-store', homePage.postStore);
      this.router.post('/account', homePage.postLogin);
      this.router.post('/apiLogin', homePage.postApiLogin);

      return this.router;
    }
}


module.exports = {
    
    HomeRoute : new HomeRoute,
};
















