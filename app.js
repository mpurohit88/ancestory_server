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

var app = express();
app.use(express.static(path.join('public')));
app.set('port', process.env.PORT || 8084);
app.listen(8084);
app.use(bodyParser());

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers',"Content-Type,Orign,X-Requested-With,Accept");
    next();
})
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

 app.get('/*', function(req, res) {
     res.sendFile(path.join(_dirname, 'public', 'index.html'));
});

// app.use('/register',loginRouter);

// app.use('/cult',culture);
app.use('/main',mainroute);

module.exports = app;

// app.use('/', indexRouter);
// app.use('/register', usersRouter);
