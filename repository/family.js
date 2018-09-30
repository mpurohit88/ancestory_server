const dbconnect = require('./mysqlConnect');


function getAllData(){
    return new Promise((resolve, reject) => {
        dbconnect().query('SELECT * from user ', function(err, rows, fields) {
          if (!err){
            resolve(rows);
            //console.log(rows);
          }
            // res.send(JSON.stringify(rows));
          else{
            reject('error');
          }
        });
        
    }).catch(function(error) {
			reject(error);
		});
}

function getCultureData(){
  return new Promise((resolve,reject)=>{
    dbconnect().query('SELECT * from culture where status="1" ', function(err,rows,fields){
      if (!err){
        resolve(rows);
       // console.log(rows);
      }
        // res.send(JSON.stringify(rows));
      else{
        reject('error');
      }
    });
        
  }).catch(function(error) {
    reject(error);
  });
}
function postSaveData(){
    dbconnect.query('insert into user(name,email,password) values("'+req.body.name+'","'+req.body.email+'","'+req.body.password+'")',function(error, results, fields){
        if(!error)
        console.log("inserted the data");
        else
        console.log('try again');
    });
}

module.exports = {getAllData, getCultureData};