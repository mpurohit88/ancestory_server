function dbconnect(){
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'ancestory2'
    });

   connection.connect(function(err) {
      if (!err) console.log('You are now connected...')
      else throw err
    });
  
    return connection;
  }
  module.exports= dbconnect;