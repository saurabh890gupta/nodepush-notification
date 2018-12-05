const express = require("express");
const app= express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
var nodemailer = require('nodemailer');
var async = require("async");
const vapidKeys = webpush.generateVAPIDKeys();
const hel="hello val";
const mongoose = require('mongoose');
const mongodb = require('mongodb');
require('./config/dbconfig');
require('./database/schema/users');
const user=mongoose.model('Users');




//static path

app.use(express.static(path.join(__dirname, "/client")));

app.use(bodyParser.json());




const publicVapidKey='BF7_w8t-IHxKLuyqZf2nhnUi0rwbynKnZVv7hohp1SCztyWvBcMZyEauhi-OYnJIbJHts_YpdHSp3Kgc7cNy9eI';
const privateVapidKey='BkzLeOcaEkdvZGa-YAl17_mhJGI60LB32kohED3WnEk';


webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);


app.post('/cromy',(req,res)=>{
  console.log(req.body);
  async.series({
    user:function(callback)
    {
      const mydata={
        fname:req.body.filepath,
      }
      console.log("this is data",mydata);
      new user(mydata).save().then(data=>{
        res.send(data);
        console.log("succefully data");

      })
      .catch(err=>{
        console.log(err);
        res.send("hello");
      })
    }
  })
})







app.post('/subscribe',(req,res)=>{
  
    const subscription =req.body;
res.status(200).json(vapidKeys);
    // res.status(201).json({});


    const payload =JSON.stringify({title: 'Gmail send your registered id'});
    webpush.sendNotification(subscription , payload).catch(err => console.error(err));
 var transporter = nodemailer.createTransport({
        service: 'gmail',
          auth: {
                  user: 'saurabh.gup890@gmail.com',
                   pass: 'saurabh890'
          }
    });
    
      var mailOptions = {
                          from: 'saurabh.gup890@gmail.com',
                          to: 'saurabh.gup890@gmail.com',
                          subject: 'Sending Email using Node.js',
                          text: 'you are success fully login!' ,
                          html: '<b>Hello world?</b><br><a href="http://localhost:7000/">My web</a>'
                          
                        };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } 
        else {
          console.log('Email sent: ' + info.response);
        }
      });
});


const port=7000;
app.listen(port,()=> console.log('server started on port '+port));;