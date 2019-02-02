var mysql = require('mysql')
function dbconnect()
{
  var pool =mysql.createPool({
    
    host:'remotemysql.com',
    user     : 'qnPasv2Msw',
    password : 'A1YYDLbFgo',
    database : 'qnPasv2Msw',
    port : 3306
  });
 
// pool.on('release',function(error,connection){
//   console.log(connection.threadId);
// })

  return pool; 
}
// function dbconnect(){
//     var connection = mysql.createConnection({
//       host     : 'localhost',
//       user     : 'root',
//       // password : 'sargatdb2015',
//       password : '',
//       database : 'ancestory'
//     });

//   //  connection.connect(function(err) {
//   //     if (!err){
//   //        console.log('You are now connected...'+count)
//   //        count++;
//   //     }
//   //     else console.log(err)
//   //   });
//   count++;
//   console.log('You are now connected...'+count)
//     return connection;
//   }

  function prepareQuery(query, parameters){
  
    if(!query || !parameters){
      throw new Error("query and parameters function parameters should be specified.");
    }
    return mysql.format(query, parameters);
  }
  module.exports= {
    dbconnect: dbconnect,
  prepareQuery: prepareQuery
};