const {dbconnect} = require('./mysqlConnect');

  function getadd(name,fid,dob,sid,lineage){
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //   'INSERT INTO tree(parent,name,sid,lineage,sublineage,dob) VALUES ("'+fid+'","'+name+'","'+sid+'","'+lineage+'","0","'+dob+'")', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);
      //   }
      //   else{
      //     reject('error');
      //   }
      // });
      dbconnect().getConnection(function(err,connection){
        if(err) throw err; //not connected!

        if(connection)  console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('INSERT INTO tree(parent,name,sid,lineage,sublineage,dob) VALUES ("'+fid+'","'+name+'","'+sid+'","'+lineage+'","0","'+dob+'")', function(error,rows,fields){
         
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
module.exports = getadd;