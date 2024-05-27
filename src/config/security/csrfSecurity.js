const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
require("dotenv").config();
const csrfProtection = csrf({ cookie: true });


module.exports = {
    
    csrfProtection : csrfProtection
};

