var express = require('express')
var router = express.Router();
var useController=require('../controller/index.controller');

router.get('/',useController.get);

router.get('/subject',useController.subject);

module.exports = router;