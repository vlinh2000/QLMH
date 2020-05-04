var express =require('express');
var app= express();
var cookieParser = require('cookie-parser')

var useRouter=require('./route/index.router');
var loginRouter=require('./route/login.router');
var tkbRouter = require('./route/tkb.route');
var pjRouter =require('./route/project.route');

var authMiddleware = require("./middleware/auth.middleware");

app.use(cookieParser("csadsa"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');

app.use('/auth',loginRouter);

app.use('/',authMiddleware,useRouter);

app.use('/',tkbRouter);

app.use('/project',pjRouter);

app.use(express.static('public'));


app.listen(3000,()=>console.log("sever loading on port 3000"));


