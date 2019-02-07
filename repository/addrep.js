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

      dbconnect(function(err,connection){

        if(err) throw err; //not connected!

        if(connection)  console.log('connected', connection.threadId);
        //use the connection and query
        connection.query('INSERT INTO newuser(name,dob) VALUES ("'+name+'","'+dob+'")', function(nu_error,nu_rows,nu_fields){
         
          if(!nu_error)
          { 
            let tree_query='INSERT INTO tree(id,parent,name,sid,lineage,sublineage) VALUES ("'+nu_rows.insertId+'","'+fid+'","'+name+'","'+sid+'","'+lineage+'","0")';
            connection.query(tree_query,function(error,row,fields){

              if(!error)
              {
                resolve(row);
              }

            });

            
          }
          console.log(nu_rows.insertId)
          connection.release();
          console.log('Process Complete %d',connection.threadId);
        });

      });
    }).catch(function(error) {
      throw(error);
    });
  }
module.exports = getadd;