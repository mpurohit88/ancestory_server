const {dbconnect} = require('./mysqlConnect');


  function getedit(name,id,sid,lineage,parent_id){
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

      dbconnect(function(err,connection){

        if(err) throw err; //not connected!

        if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        check_newuser='select * from newuser where id="'+id+'" limit 1';
        connection.query(check_newuser,function(check_erro,check_rows,check_field){
          if(!check_rows)
          {
            console.log(check_rows)
            connection.query('UPDATE tree SET name="'+name+'" where id="'+id+'" and parent="'+parent_id+'" and sid="'+sid+'" and lineage="'+lineage+'"', function(error,rows,fields){
         
                if(!error)
                { 
                  resolve(rows);
                }
                  connection.release();
                  console.log('Process Complete %d',connection.threadId);
                });

          }else
          {
             connection.query('UPDATE tree SET name="'+name+'" where id="'+id+'" and parent="'+parent_id+'" and sid="'+sid+'" and lineage="'+lineage+'"', function(error,rows,fields){
         
                if(!error)
                { 
                  resolve(rows);
                }
                  connection.release();
                  console.log('Process Complete %d',connection.threadId);
                });
          }//if closed

        });
    

      });
    }).catch(function(error) {
      throw(error);
    });
  }
module.exports = getedit;