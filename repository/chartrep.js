const dbconnect = require('./mysqlConnect');

  function getChartData(){
    return new Promise((resolve,reject)=>{
      dbconnect().query(
       // 'SELECT parent.fname AS pname,parent.parentid as mainpid,child.fname as childname, child.parentid as childpid FROM tree parent   left JOIN tree child ON parent.id=child.parentid  WHERE parent.fname="Dashrath"  && parent.sid = "1"  && parent.dob ="1960-09-18"', function(err,rows,fields){
         'select * from tree where sid=1', function(err,rows,fields){
        if (!err){
          resolve(rows);
          console.log(rows);
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
module.exports = getChartData;