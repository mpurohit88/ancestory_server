const {dbconnect} = require('./mysqlConnect');

  function getedit(name,id){
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //     'UPDATE tree SET name="'+name+'" where id="'+id+'"', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //   }
      //   else{
      //     reject('error');
      //   }
      // });
      dbconnect().getConnection(function(err,connection){
        if(err) throw err; //not connected!

        if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('UPDATE tree SET name="'+name+'" where id="'+id+'"', function(error,rows,fields){
         
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
module.exports = getedit;