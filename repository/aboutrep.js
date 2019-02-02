const {dbconnect} = require('./mysqlConnect');

  function getAboutData(){
    return new Promise((resolve,reject)=>{
      // dbconnect().query('SELECT * from about ', function(err,rows,fields){
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
        if(err) console.log(err); //not connected!

        if(connection){
           console.log('connected', connection.threadId);
         
          }
        //use the connection and query
        connection.query('SELECT * from about ', function(error,rows,fields){
          
          if(!error)
          { 
            resolve(rows);
          }
          connection.release()
          console.log('Process Complete %d',connection.threadId);

        });

      });
    }).catch(function(error) {
      console.log(error)
    });
  }
  module.exports = getAboutData;