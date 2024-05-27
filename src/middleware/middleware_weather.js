const express = require('express');
const readline = require('readline');
require('dotenv').config();

class middleware_weather {

    constructor() {
       
    }

  
    middlewareWeather = async (req, res, next)=> {

        
        return next();

    }


}

module.exports = {
    
     middleware_weather : new middleware_weather,
}