var express = require('express')
var router = express.Router();
var Controller=require('../controller/login.controller');

router.get('/login',Controller.get);

router.post('/login',Controller.postLogin);

module.exports = router;