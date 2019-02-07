const {dbconnect} = require('./mysqlConnect');

  function getsearch(name,surname,lineage){
     
    return new Promise((resolve,reject)=>{
         console.log("name="+name+"surname="+surname+"lineage="+lineage)
      // dbconnect().query(
      // "select id,name,parent from tree where name='"+name+"'and sid='"+surname+"' and lineage='"+lineage+"'", function(err,rows,fields){
      //   if (!err){
       
      //  let ch=getchart(surname,lineage);
    
      //  resolve(ch);   
      //   }
      //     // res.send(JSON.stringify(rows));
      //   else{
      //     reject(err);
      //   }
      // });

      dbconnect(function(err,connection){

        if(err) throw err; //not connected!

        if(connection) console.log('connected');
        //use the connection and query
        let q="select id,name,parent from tree where name='"+name+"'and sid='"+surname+"' and lineage='"+lineage+"'";
        connection.query(q, function(error,rows,fields){
         
          if(!error)
          { 

            rows="success"
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

  function getchart(surname,lineage){
     
    return new Promise((resolve,reject)=>{
    // dbconnect().query(
    //     "select * from tree where sid='"+surname+"' and lineage='"+lineage+"'", function(err,rows,fields){
    //       if (!err){
    //      resolve(rows);   
    //        console.log(rows);
    //       }
    //       else{
    //         reject(err);
    //       }
    //     });

    dbconnect(function(err,connection){

      if(err) throw err; //not connected!
let querys="select * from tree where sid='"+surname+"' and lineage='"+lineage+"'";
      if(connection) console.log('connected', connection.threadId);
      //use the connection and query
      connection.query(querys, function(err,rows,fields){
       
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
module.exports = getsearch;