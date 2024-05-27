const express = require('express');
const {middleware} = require('../middleware/middleware');
const {blog_api} = require('../controller/api/api_BlogController.js');
const {middleware_blog} = require('../middleware/middleware_blog');

class BlogRoute{

  constructor(){
    
      this.router = express.Router();
  }

  Router(){

      this.router.get('/',middleware_blog.middlewareBlog,blog_api.index);
      this.router.post('/blog-store', blog_api.store);

      return this.router;

  }
}


module.exports = {

  BlogRoute : new BlogRoute
};


