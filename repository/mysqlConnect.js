// This will be in some JSON config we'll say
var dbOptions = {
    host:'remotemysql.com',
    user     : 'qnPasv2Msw',
    password : 'A1YYDLbFgo',
    database : 'qnPasv2Msw',
    port : 3306
  };
 
  function prepareQuery(query, parameters){
  
    if(!query || !parameters){
      throw new Error("query and parameters function parameters should be specified.");
    }
    return mysql.format(query, parameters);
  }

//This will depend on which version/module/db you're using, but here's what mine looks like
const MySQL = require("mysql");
// const config = require("../config/db.json");
let connectionPool = MySQL.createPool({host: dbOptions.host, user: dbOptions.user, password: dbOptions.password, port: dbOptions.port, database: dbOptions.database});

const dbconnect = function(done){
   connectionPool.getConnection(done);
};

module.exports = {dbconnect: dbconnect, prepareQuery: prepareQuery};