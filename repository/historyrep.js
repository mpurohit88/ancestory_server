const {dbconnect} = require('./mysqlConnect');

  function getHistory(){
    return new Promise((resolve,reject)=>{
      // dbconnect().query('SELECT * from history', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //     dbconnect().end(function(err){
      //       if(err){
      //         return console.log(err);
      //       }
      //       console.log("connection end"); 
      //     }
      //     );
      //   }
      //     // res.send(JSON.stringify(rows));
      //   else{
      //     reject('error');
      //   }
      // });

      dbconnect(function(err,connection){

        if(err) throw err; //not connected!

        if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('SELECT image from history', function(error,rows,fields){
         
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
  module.exports = getHistory;