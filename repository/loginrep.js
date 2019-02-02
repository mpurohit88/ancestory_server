const { dbconnect, prepareQuery} = require('./mysqlConnect');

function getUseByName(emailId) {

  return new Promise((resolve, reject) => {
    // dbconnect().query(
    //   "SELECT * FROM USERS WHERE email = '" + emailId + "'",
    //   function(err, rows, fields) {
    //     if (!err) {
    //       resolve(rows);
    //       // console.log(rows);
    //     } else {
    //       reject(err);
    //     }
    //   }
    // );
    dbconnect().getConnection(function(err,connection){
      if(err) throw err; //not connected!

      if(connection) {console.log('connected');
      //use the connection and query
      connection.query("SELECT * FROM USERS WHERE email = '" + emailId + "'", function(err,rows,fields){
      
        if(!err)
        { 
console.log(rows)
          resolve(rows);
        }
        connection.release();
          console.log('Process Complete %d',connection.threadId);

      });
    }

    });
  }).catch(function(error) {
    throw error;
  });
 }
 
 function insertCustomer(emailId, password) {
  let customerInsert = "INSERT INTO users(email, password) VALUES (?,?)";
 
  return new Promise((resolve, reject) => {
    // dbconnect().query(prepareQuery(customerInsert, [emailId, password]), function(
    //   err,
    //   result,
    //   fields
    // ) {
    //   if (!err) {
    //     resolve(result);
      
    //   } else {
    //     reject(err);
       
    //   }
    // });
    dbconnect().getConnection(function(err,connection){
      if(err) throw err; //not connected!

      if(connection){ console.log('connected');
      //use the connection and query
      connection.query(prepareQuery(customerInsert,[emailId,password]), function(error,rows,fields){
        if(!error)
        { 
          resolve(rows);
        }
        connection.release()
        console.log('Process Complete %d',connection.threadId);
      });
}
    });
  }).catch(function(error) {
    throw(error);
  });
 }
 
module.exports = { getUseByName, insertCustomer};