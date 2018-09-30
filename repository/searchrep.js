const dbconnect = require('./mysqlConnect');

  function getsearch(name,surname,lineage){
     
    return new Promise((resolve,reject)=>{
         console.log(name+surname+lineage)
      dbconnect().query(
      "select id,name,parent from tree where name='"+name+"'and sid='"+surname+"' and lineage='"+lineage+"'", function(err,rows,fields){
        if (!err){
       resolve(rows);   
       let ch=getchart(surname,lineage);
         console.log(ch);
        }
          // res.send(JSON.stringify(rows));
        else{
          reject(' data error');
        }
      });
          
    }).catch(function(error) {
    throw(error);
    });
  }

  function getchart(surname,lineage){
     
    return new Promise((resolve,reject)=>{
    dbconnect().query(
        "select * from tree where sid='"+surname+"' and lineage='"+lineage+"'", function(err,rows,fields){
          if (!err){
         resolve(rows);   
           console.log(rows);
          }
          else{
            reject(' data error');
          }
        });
          
    }).catch(function(error) {
    throw(error);
    });
  }
module.exports = getsearch;