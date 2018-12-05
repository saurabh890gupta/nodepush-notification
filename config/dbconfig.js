const express =require('express');
var app=express();
var mongoose=require('mongoose');



mongoose.connect("mongodb://localhost/helpost", { useNewUrlParser: true });

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));