const express = require('express');
const cors = require('cors');
let router = express.Router();
const {ChatRoute} = require('./chat');
const {HomeRoute} = require('./home');
const {CompanyRoute} = require('./company');
const {BlogRoute} = require('./blog');
const {AuthRoute} = require('./auth');
const {AdminRoute} = require('./admin');
const {WeatherRoute} = require('./weather');
const {bot_facebook} = require('../controller/botFbController');
const {postWebhook, getWebhook} = require('../controller/botFbController');


let webInit = (app) => {

     
    app.get('/botfb', bot_facebook.index);
    app.get('/webhook', getWebhook)
    app.post('/webhook', postWebhook);
    app.use('/chat', ChatRoute.Router());
    app.use('/admin', AdminRoute.Router());
    app.use('/company-api', CompanyRoute.Router());
    app.use('/blog-api', BlogRoute.Router());
    app.use('/weather-api', WeatherRoute.Router());
    app.use('/auth-api', AuthRoute.Router());

    app.use('/', HomeRoute.Router());
}

module.exports = {
    
    webInit : webInit
};

