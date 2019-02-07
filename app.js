var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var bodyParser=require('body-parser');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var loginRouter = require('./routes/users');
// var culture = require('./routes/cultserv');
var mainroute= require('./routes/main');
var loginroute= require('./routes/loginn')
;
var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json

 
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers',"Content-Type,Orign,X-Requested-With,Accept");
    res.header( 'Content-Type: text/html; charset=utf-8' ); 
    next();
})
// app.use(express.static(path.join('public')));

app.set('port', process.env.PORT || 3001);
app.listen(3001);
app.use(bodyParser.json())

// app.set('port', process.env.PORT || 3000);
// app.listen(3000);
app.use(bodyParser());



// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


 app.use(express.static(path.join(__dirname, 'public')));
// app.use('/register',loginRouter);

// app.use('/cult',culture);
app.use('/main',mainroute);
app.use('/loginn',loginroute);

 app.get('/*', function(req, res) {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

// app.use('/', indexRouter);
// app.use('/register', usersRouter);
