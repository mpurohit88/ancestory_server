var express = require('express');
var fs = require('file-system');
var router = express.Router();
const nodemailer = require('nodemailer');
const multer=require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
   
    callback(null, './public/upload/');
  },
  filename: function (req, file, callback) {

    if(file.mimetype==="image/jpeg" || file.mimetype==="image/jpg")
    {
    callback(null,  Date.now()+file.originalname);
     }
  }
});
var upload = multer({ storage : storage });


var getCultureData = require('../repository/cultrep');
var getAboutData = require('../repository/aboutrep');
var getWelcomeData = require('../repository/welcomerep');
var {getChartData,headerSid} = require('../repository/chartrep');
var getsearch= require('../repository/searchrep');
var getSnames= require('../repository/snamerep');
var getLineagename= require('../repository/lineagenamerep');
var getadd= require('../repository/addrep');
var getsearchtree= require('../repository/searchtreerep');
var getHistory= require('../repository/historyrep');
var getson= require('../repository/sonrep');
var getedit= require('../repository/editrep');
var getlname = require('../repository/headerrep');
var trans= require('../config/mailtransport');

  
  router.get('/header',async function(req, res, next) {
    try{
   
    let lineagename=await getlname().then();
      let data={
     lineagename:lineagename
      }
      res.send(JSON.stringify(data));
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

  router.get('/culture',async function(req, res, next) {
    try{

     await getCultureData().then(
       result=> 
      
       res.json(result)
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
  router.get('/history',async function(req, res, next) {
    try{

     let y=await getHistory().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
  router.get('/welcome', function(req, res, next) {
    try{


     getWelcomeData().then(
       result=> 
        res.status(200).send(result)
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
 
  router.post('/chart',async function(req, res, next) {
    try{
     let id= JSON.parse(req.body.id)
     console.log(req.body)
     let y=await getChartData(id).then(
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
   
    await  getsearch(names,surnames,lineages).then(function(result){
         if(result.length>0){
          res.status(200).send(JSON.stringify(result));
        // res.send(JSON.stringify(result))
         }
        else{
          res.status(200).send({er:1});
        }
       } 
      
      
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

  router.post('/searchtree',async function(req, res, next) {
    try{ 

      sid=req.body.surname;
      lineage=req.body.lineage;
      fname=req.body.fname;
      gfname=req.body.gfname;
    await  getsearchtree(fname,gfname,sid,lineage).then(function(result){
         if(result.length>0){
          res.status(200).send(JSON.stringify(result));
          console.log(req.body)
        // res.send(JSON.stringify(result))
         }
        else{
          console.log(req.body)
          res.status(200).send({er:1});
        }
       } 
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });


  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
 
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

  router.get('/sname',async function(req, res, next) {
    try{

     let y=await getSnames().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

  router.post('/lineagename',async function(req, res, next) {
    try{
     var s=req.body.sid;
  
     let y=await getLineagename(s).then(
       result=> 
       res.send(JSON.stringify(result))

      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

  router.post("/addreq",upload.single('selectedFile'),(req,res)=>{

var data=JSON.parse(req.body.data)

if(!req.file)
    {
       res.status(200).send({msg:"imagenot"});
        
    }else
    {

      var surname=data.surname;
    
    var lineage=data.lineage;
    var name=data.name;
    var fname=data.fname;
    var gfname=data.gfname;
    var dob=data.dob;
    var address=data.address;
    var phone=data.phone;
    var mobile=data.mobile;
    var wtsapno=data.wtsapno;
   var pic=req.file.filename;
    
    var email=data.email;
    var content = `name: ${name} \n father name: ${fname} \n surname: ${surname} \n lineage: ${lineage} \n grand father name: ${gfname} \n dob: ${dob} \n address:${address} \n phone: ${phone} \n mobile: ${mobile} \n wtsapno: ${wtsapno} \n email: ${email} \n `
 
    var mail = {
      from: 'pvanshavali@gmail.com',
      to: 'rishabhverma2088@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New Request for adding name to graph ',
      attachments: [  
        {   
            filename: "identitycard.jpg",
            path:'./public/upload/'+pic,
             
            // content: fs.createReadStream(pic)
        }   ],
      text: content
    }
  
    trans().sendMail(mail, (err, info) => {
      if (err) {
        console.log(err);
        res.status(200).send({msg:"fail"});
    } else
    {
      console.log('Message sent: %s', info.messageId);
      res.status(200).send({msg:"success"});
    }
    
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
  }//else closed

  });
  

  router.post('/add',async function(req, res, next) {
    try{
      name=req.body.name;
      fid=req.body.fid;
      dob=req.body.dob;
      sid=req.body.sid;
      lineage=req.body.lineage;
     await getadd(name,fid,dob,sid,lineage).then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });
  router.post('/edit',async function(req, res, next) {
    try{
      name=req.body.name;
      id=req.body.id;
      parent_id=req.body.mainid;
      sid=req.body.sid;
      lineage=req.body.lineage;
  
  
     let y=await getedit(name,id,sid,lineage,parent_id).then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

  router.get('/son',async function(req, res, next) {
    try{
      id=req.body.personid;
      console.log(req.body.id);
     let y=await getson(id).then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

  router.get('/dropdownsid',async function(req, res, next) {
    try{

     let y=await headerSid().then(
       result=> 
       res.send(JSON.stringify(result))
      );  
    }
    catch(error){
      console.log("Error.....", error);
    }
  });

module.exports = router;
