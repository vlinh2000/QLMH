var express = require('express')
var router = express.Router();
var useController=require('../controller/tkb.controller');

router.get("/tkb",useController.get);

module.exports = router;