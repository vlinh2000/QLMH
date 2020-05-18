var express = require('express');
var multer  = require('multer');
var router = express.Router();
var useController=require('../controller/english.controller');
var upload = multer({ dest: './public/uploads/' });

router.get('/english',useController.get);

router.post('/english',upload.single('audio'),useController.post);

router.get('/english/create',useController.create);

// router.get('/english/search',useController.searchAudio);


module.exports = router;