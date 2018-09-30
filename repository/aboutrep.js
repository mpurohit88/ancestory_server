const dbconnect = require('./mysqlConnect');

  function getAboutData(){
    return new Promise((resolve,reject)=>{
      dbconnect().query('SELECT * from about ', function(err,rows,fields){
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
  module.exports = getAboutData;