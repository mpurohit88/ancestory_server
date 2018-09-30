var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var getCultureData = require('../repository/cultrep');
var getAboutData = require('../repository/aboutrep');
var getWelcomeData = require('../repository/welcomerep');
var getChartData = require('../repository/chartrep');
var getsearch= require('../repository/searchrep');
// var getalldata = require('../repository/headerrep');
var trans= require('../config/mailtransport');

  router.get('/culture',async function(req, res, next) {
    try{

     let y=await getCultureData().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
  router.get('/about',async function(req, res, next) {
    try{

     let y=await getAboutData().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
  router.get('/welcome',async function(req, res, next) {
    try{

     let y=await getWelcomeData().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
 
  router.post('/chart',async function(req, res, next) {
    try{
     let y=await getChartData().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
  router.post('/search',async function(req, res, next) {
    try{ 
      let names=req.body.name;
      let surnames=req.body.surname;
      let lineages=req.body.lineage;
      console.log(req.body)
     let y=await getsearch(names,surnames,lineages).then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
  //header surname
  // router.get('/head',async function(req, res, next) {
  //   try{
     
  //    let y=await getalldata().then(
  //      result=> 
  //      res.send(JSON.stringify(result))
  //     );  
  //   }
  //   catch(error){
  //     console.log("Error.....", error);
  //   }
  // });


  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  console.log(req.body);
    var mail = {
      from: 'pvanshavali@gmail.com',
      to: 's.s.vyas16@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: message
    }
  
    trans().sendMail(mail, (err, info) => {
      if (error) {
        return console.log(error);
    } 
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
  });
module.exports = router;
