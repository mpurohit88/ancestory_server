const {dbconnect} = require('./mysqlConnect');


function getAllData(){
    return new Promise((resolve, reject) => {
        // dbconnect().query('SELECT * from user ', function(err, rows, fields) {
        //   if (!err){
        //     resolve(rows);
        //     //console.log(rows);
        //   }
        //     // res.send(JSON.stringify(rows));
        //   else{
        //     reject('error');
        //   }
        // });
        dbconnect().getConnection(function(err,connection){
          if(err) throw err; //not connected!
  
          if(connection) console.log('connected', connection.threadId);
          //use the connection and query
          connection.query('SELECT * from user', function(error,rows,fields){
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

function getCultureData(){
  return new Promise((resolve,reject)=>{
    // dbconnect().query('SELECT * from culture where status="1" ', function(err,rows,fields){
    //   if (!err){
    //     resolve(rows);
    //    // console.log(rows);
    //   }
    //     // res.send(JSON.stringify(rows));
    //   else{
    //     reject('error');
    //   }
    // });
    dbconnect().getConnection(function(err,connection){
      if(err) throw err; //not connected!

      if(connection) console.log('connected');
      //use the connection and query
      connection.query('SELECT * from culture where status="1"', function(err,rows,fields){
       
        if(rows)
        { 
          resolve(rows);
          connection.release();
        }

      });

    });
        
  }).catch(function(error) {
    reject(error);
  });
}
function postSaveData(){
    // dbconnect.query('insert into user(name,email,password) values("'+req.body.name+'","'+req.body.email+'","'+req.body.password+'")',function(error, results, fields){
    //     if(!error)
    //     console.log("inserted the data");
    //     else
    //     console.log('try again');
    // });
    dbconnect().getConnection(function(err,connection){
      if(err) throw err; //not connected!

      if(connection) console.log('connected');
      //use the connection and query
      connection.query('insert into user(name,email,password) values("'+req.body.name+'","'+req.body.email+'","'+req.body.password+'")', function(err,rows,fields){
       
        if(rows)
        { 
          resolve(rows);
          connection.release();
        }

      });

    });
}

module.exports = {getAllData, getCultureData};