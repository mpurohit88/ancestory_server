const {dbconnect} = require('./mysqlConnect');

  function getson(id){
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //    'select * from tree where id='+id+'', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //     // console.log(rows);
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
        connection.query('select * from tree where id='+id+'', function(error,rows,fields){
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
module.exports = getson;