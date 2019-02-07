const {dbconnect} = require('./mysqlConnect');

  function getsearchtree(fname,gfname,sid,lineage){
    console.log(lineage)
    return new Promise((resolve,reject)=>{
      // dbconnect().query(
      //   'SELECT parent.name AS pname,parent.parent as mainpid,child.name as childname, child.parent as childpid,child.lineage as line, child.id as childid, child.dob as dob FROM tree parent JOIN tree child ON parent.id=child.parent  WHERE parent.name="'
      //   +gfname+'"  && parent.sid = "'+sid+'"  && parent.lineage ="'+lineage+'" && child.name="'+fname+'"', function(err,rows,fields){
      //   if (!err){
      //     resolve(rows);   
      //   }
      //   else{
      //     reject(err);
      //   }
      // });

      dbconnect(function(err,connection){

        if(err) throw err; //not connected!

let querys='SELECT  DISTINCT(child.id),parent.name AS pname,parent.id as mainpid,child.name as childname, child.parent as childpid,child.lineage as line, child.id as childid,lineage.lname FROM tree parent JOIN tree child ON parent.id=child.parent JOIN lineage ON child.lineage = lineage.id  WHERE '+
            '((parent.name="'+gfname+'" and child.name="'+fname+'" and child.lineage="'+lineage+'"))';
       
            if(connection) console.log('connected', connection.threadId);
        //use the connection and query
        connection.query(querys, function(error,rows,fields){
          if(!error)
          {  
         
            resolve(rows);
          }
    console.log(error)
          connection.release()
          console.log('Process Complete %d',connection.threadId);

        });

      });
          
    }).catch(function(error) {
    throw(error);
    });
  }

module.exports = getsearchtree;