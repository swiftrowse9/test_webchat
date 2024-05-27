const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog_data = new Schema(
    
    {
        title : {type : String, maxLength: 1000000000},
        image : {type : String, maxLength: 1000000000},
        author : {type : String, maxLength: 1000000000},
        content : {type : String, maxLength: 1000000000},
        createdAt : {type : Date, default: Date.now}, 
        updatedAt : {type : Date, default: Date.now}, 
    },

);


module.exports = {
    
  Blog_data : mongoose.model('Blog_data', Blog_data),

};
















