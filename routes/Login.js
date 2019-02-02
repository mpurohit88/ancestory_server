var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var {
  getalldata,
  getUseByName,
  insertCustomer
} = require("../repository/loginrep");



// router.get("/", async function(req, res, next) {
//   try {
//     let result = await getalldata().then(result =>
//       res.send(JSON.stringify(result))
//     );
//   } catch (error) {}
// });

router.post("/register", function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  insertCustomer(req.body.name, hashedPassword)
    .then(function(result) {
      // create a xtoken
      var token = jwt.sign(
        { id: result.insertId },
        "x56a4180-h5aa-42ec-a945-5fd21dec0538",
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );

      res.status(200).send({ auth: true, token: token });
    })
    .catch(err =>
      res.status(500).send("There was a problem registering the user.")
    );
});

router.post("/login", async function(req, res, next) {
  try {
    
    getUseByName(req.body.email).then(function(result) {
      if (result.length > 0) {  
       
        if (checkUser(req.body.password, result[0].password)) {
          var token = jwt.sign(
            { id: result[0].id },
            "x56a4180-h5aa-42ec-a945-5fd21dec0538",
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );

          res.status(200).send({ auth: true, token: token });
        } else {
          res.status(500).send("There was a problem login the user.");
        }
            }else {
              // Email id is not exists in DB. Register user.
              var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      console.log(req.body.email)
              insertCustomer(req.body.email, hashedPassword)
                .then(function(result) {
                  // create a xtoken
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
router.post("/createschedule",async function(req, res){
  try {
   let datefrom=req.body.dfrom;
   let dateto=req.body.dto;
   let check=req.body.checkdata;  
     console.log(req.body)

    createschedule(datefrom,dateto,check).then(function(result){
     var token=jwt.sign(
       {id:result.insertid},
       "x56a4180-h5aa-42ec-a945-5fd21dec0538",
       {expiresIn: 86400} // expires in 24 hours
       );
       res.status(200).send({ auth: true, token: token });
    }).catch(err =>
      res.status(500).send("There was a problem create in user.")
    );


    
  } catch (error) {
    
  }
})

module.exports = router;
