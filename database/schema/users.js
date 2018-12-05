const mongoose =require('mongoose');

let Schema=mongoose.Schema;

var Users =new Schema({
    id:String,
    name:String,
    address:String,
    
},{collection:'Users'});

module.exports=mongoose.model('Users' ,Users);