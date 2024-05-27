const express = require('express');
const {weather_api} = require('../controller/api/api_WeatherController');
const {middleware_weather} = require('../middleware/middleware_weather');

class WeatherRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){

      this.router.get('/',middleware_weather.middlewareWeather,weather_api.index);

      return this.router;
    }
}


module.exports = {
    
   WeatherRoute : new WeatherRoute,
};
















