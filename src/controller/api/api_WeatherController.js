const renderView = require('../../models/database_function.js');
const {API} = require('../../services/api.js');
const axios = require('axios');

require("dotenv").config();


class api_WeatherController {

    index = async (req, res, next)=>{

      const data = await API.weatherAPI(axios);
      
      res.status(200).send(data);
    }
}

module.exports = {
  
  weather_api : new api_WeatherController,
}
