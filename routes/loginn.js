var express = require('express');
var bcrypt =require("bcryptjs");
var jwt= require("jsonwebtoken");
var router = express.Router();
var {
    getUseByName,
    insertCustomer
}= require("../repository/loginrep.js");

router.post("/login",async function(req, res, next) {
  try {
console.log(req.body.email)
    await getUseByName(req.body.email).then(function(result) {
      if (result.length > 0) {
        
                      if (checkUser(req.body.password, result[0].password)) {
                        console.log(result)
                        var token = jwt.sign(
                          { id: result[0].id },
                          "x56a4180-h5aa-42ec-a945-5fd21dec0538",
                          {
                            expiresIn: 86400 // expires in 24 hours
                          }
                        );
               
                        res.status(200).send({ auth: true, token: token });
                      } else {
                        console.log("hi")
                        res.status(500).send("There was a problem login the user.");
                      }

            }else {
              // Email id is not exists in DB. Register user.
              var hashedPassword = bcrypt.hashSync(req.body.password, 8);
 
              insertCustomer(req.body.email, hashedPassword)
                .then(function(result) {           
                  var token = jwt.sign(
                    { id: result.insertId },
                    "x56a4180-h5aa-42ec-a945-5fd21dec0538",
                    {
                      expiresIn: 86400 // expires in 24 hours
                    }
                  );
 
                  res.status(200).send({ auth: true, token: token });
                }).catch(err =>
                  res.status(500).send("There was a problem registering the user.")
                );
            }
 
          }).catch(err =>res.status(500).send("There was a problem registering the user."));
      } catch (error) {

    res.status(500).send("There was a problem login the user.");
  }
 });
 
 function checkUser(password, passwordHash) {

  const match = bcrypt.compareSync(password, passwordHash);
 
  if (match) {
    return true;
  }
 
  return false;
 }

   module.exports = router;