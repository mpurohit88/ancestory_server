const dbconnect = require('./mysqlConnect');

  function getWelcomeData(){
    return new Promise((resolve,reject)=>{
      dbconnect().query('SELECT * from welcome', function(err,rows,fields){
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
  module.exports = getWelcomeData;