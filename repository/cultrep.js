const {dbconnect} = require('./mysqlConnect');
  function getCultureData(){
    return new Promise((resolve,reject)=>{
      // dbconnect().query('SELECT * from culture  ', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //     //console.log(rows);
      //   }
      //     // res.send(JSON.stringify(rows));
      //   else{
      //     reject('error');
      //   }
      // });
      dbconnect().getConnection(function(err,connection){
        if(err) throw err; //not connected!

        if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('SELECT * from culture', function(error,rows,fields){
         
          if(!error)
          { 
            resolve(rows);
          }
          connection.release();
          console.log('Process Complete %d',connection.threadId);

        });

      });
    }).catch(function(error) {
      throw(error);
    });
  }
  module.exports = getCultureData;