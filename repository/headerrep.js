const dbconnect = require('./mysqlConnect');

  function getsurname(){
    return new Promise((resolve,reject)=>{
      dbconnect().query(
         'SELECT * FROM surname ', function(err,rows,fields){
        if (!err){
          resolve(rows);
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
  function getlname(){
    return new Promise((resolve,reject)=>{
      dbconnect().query(
         'SELECT sn.sname AS sname, ln.lname as lname FROM surname sn LEFT JOIN lineage ln ON sn.id=ln.sid', function(err,rows,fields){
        if (!err){
          resolve(rows);
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
  function getalldata(){
    return new Promise((resolve,reject)=>{
      
      if (!resolve){
        let sn=getsurname();
        let ln=getlname();
        resolve(sn+ln);
      }
        // res.send(JSON.stringify(rows));
      else{
        reject('error');
      }
  }).catch(function(error) {
    //reject(error);
  });
  }
module.exports = getalldata;