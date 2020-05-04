var express = require('express')
var router = express.Router();
var useController=require('../controller/project.controller');

router.get("/",useController.get);

module.exports = router;