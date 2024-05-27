const express = require('express');
const readline = require('readline');
require('dotenv').config();

class middleware_company {

    constructor() {
       
    }

  
    middlewareCompany = async (req, res, next)=> {

        const accessKey = req.get('Authorization');

        if (!accessKey || !accessKey.startsWith('Bearer ')) {

            return res.status(401).json({ error: 'Bạn không có quyền truy cập!!!'});
        }

        const providedAccessKey = accessKey.split(' ')[1];

        if (providedAccessKey !== process.env.access_key) {

            return res.status(403).json({ error: 'Forbidden' });
        }
    
        return next();

    }


}

module.exports = {
    
    middleware_company : new middleware_company,
}