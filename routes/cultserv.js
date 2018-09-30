var express = require('express');
var router = express.Router();

var culture = require('../repository/family');

  // var tp=culture.getCultureData();
 

  router.get('/culture/',async function(req, res, next) {
    try{
    

     let y=await culture.getCultureData().then(
       result=> 
       res.send(JSON.stringify(result))
      );
  
    }
    catch(error){

    }
  });


 

// router.get('/c/:id',function (req, res, next) {
//   console.log('the response will be sent by the next function ...')
//   if (req.params.id === '0') next()
//   // otherwise pass the control to the next middleware function in this stack
//   else next()
// },async function(req, res, next) {
//     try{
    
  
//      let y=await culture.getCultureData().then(
//        result=> 
//        res.send(JSON.stringify(result))
//       );
   
//     }
//     catch(error){
  
//     }
//   });

module.exports = router;
