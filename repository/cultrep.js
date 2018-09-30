const dbconnect = require('./mysqlConnect');


  function getCultureData(){
    return new Promise((resolve,reject)=>{
      dbconnect().query('SELECT * from culture  ', function(err,rows,fields){
        if (!err){
          resolve(rows);
          //console.log(rows);
        }
          // res.send(JSON.stringify(rows));
        else{
          reject('error');
        }
      });
          
    }).catch(function(error) {
      reject(error);
    });
  }
  module.exports = getCultureData;