const {dbconnect} = require('./mysqlConnect');


  function getChartData(id){
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //  // 'SELECT parent.fname AS pname,parent.parentid as mainpid,child.fname as childname, child.parentid as childpid FROM tree parent   left JOIN tree child ON parent.id=child.parentid  WHERE parent.fname="Dashrath"  && parent.sid = "1"  && parent.dob ="1960-09-18"', function(err,rows,fields){
      //    'select * from tree where sid=1', function(err,rows,fields){
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
         let pid=1;
        connection.query('select * from tree where lineage="'+id+'"', function(error,rows,fields){
         
          if(!error)
          {
            resolve(rows);
          }
           console.log(id)
          connection.release();
          console.log('Process Complete %d',connection.threadId);

        });

      }); 
    }).catch(function(error) {
      throw(error);
    });
  }


  function headerSid(){
    return new Promise((resolve,reject)=>{



      dbconnect(function(err,connection){

        if(err) throw err; //not connected!

        if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('select id from lineage', function(error,rows,fields){
         
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
module.exports = {getChartData,headerSid};