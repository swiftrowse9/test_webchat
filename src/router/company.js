const express = require('express');
const {middleware_company} = require('../middleware/middleware_company');
const {company_api} = require('../controller/api/api_CompanyController.js');

class CompanyRoute{

  constructor(){
    
      this.router = express.Router();
  }

  Router(){

      this.router.get('/',middleware_company.middlewareCompany,company_api.index);

      return this.router;

  }
}


module.exports = {

  CompanyRoute : new CompanyRoute
};


