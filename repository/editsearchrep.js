const {dbconnect} = require('./mysqlConnect');

  function geteditsearch(fname,gfname,sid,lineage){
     
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //   'SELECT parent.name AS pname,parent.parent as mainpid,child.name as childname, child.parent as childpid,child.lineage as line, child.id as childid FROM tree parent JOIN tree child ON parent.id=child.parent  WHERE parent.name="'
      //   +gfname+'"  && parent.sid = "'+sid+'"  && parent.lineage ="'+lineage+'" && child.name="'+fname+'"', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);   
      //   }
      //   else{
      //     reject(err);
      //   }
      // });
      let querys= 'SELECT parent.name AS pname,parent.parent as mainpid,child.name as childname, child.parent as childpid,child.lineage as line, child.id as childid FROM tree parent JOIN tree child ON parent.id=child.parent  WHERE parent.name="'
                   +gfname+'"  && parent.sid = "'+sid+'"  && parent.lineage ="'+lineage+'" && child.name="'+fname+'"';
      dbconnect(function(err,connection){
        if(err) throw err; //not connected!

        if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        connection.query(querys, function(error,rows,fields){
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

module.exports = geteditsearch;