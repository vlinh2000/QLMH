var express = require('express')
var router = express.Router();
var useController=require('../controller/index.controller');

router.get('/',useController.get);

router.get('/subject/create',useController.create);

router.post('/subject/create',useController.postCreate);

module.exports = router;