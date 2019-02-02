const {dbconnect} = require('./mysqlConnect');

  function getsurname(){
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //    'SELECT * FROM surname ', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //   }
      //     // res.send(JSON.stringify(rows));
      //   else{
      //     reject('error');
      //   }
      // });
      dbconnect().getConnection(function(err,connection){
        if(err) throw err; //not connected!

        if(connection)console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('SELECT * FROM surname', function(error,rows,fields){
         
          if(!error)
          { 
            resolve(rows);
          }
          connection.release()
          console.log('Process Complete %d',connection.threadId);

        });

      });
          
    }).catch(function(error) {
      throw(error);
    });
  }
  function getlname(){
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //    'SELECT sn.sname AS sname,sn.id as id, ln.lname as lname,ln.sid as sid FROM surname sn LEFT JOIN lineage ln ON sn.id=ln.sid', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //   }
      //     // res.send(JSON.stringify(rows));
      //   else{
      //     reject('error');
      //   }
      // });
      let querys='SELECT sn.sname AS sname,sn.id as id, ln.lname as lname,ln.sid as sid FROM surname sn LEFT JOIN lineage ln ON sn.id=ln.sid';
      dbconnect().getConnection(function(err,connection){
        if(err) throw err; //not connected!

        if(connection) console.log('connected');
        //use the connection and query
        connection.query(querys, function(err,rows,fields){
         
          if(rows)
          { 
            resolve(rows);
            connection.release();
          }

        });

      });
          
    }).catch(function(error) {
      throw(error);
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
    throw(error);
  });
  }
module.exports = getlname;