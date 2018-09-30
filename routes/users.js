var express = require('express');
var router = express.Router();

var logmodel = require('../repository/family');
logm=logmodel.getAllData();
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   getAllData().then(function(result) {
//     res.send('respond with a resource');
//   }).catch(function(error) {
//     res.send(error);
//   });
// });

router.get('/', async function(req, res, next) {
  try{
    let result=await logm().then(result=>res.send(JSON.stringify(result)));
    console.log(result);
  }
  catch(error){

  }
});

module.exports = router;
