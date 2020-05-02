var express = require('express')
var router = express.Router();
var useController=require('../controller/index.controller');

router.get('/',useController.get);

router.get('/subject/create',useController.create);

router.post('/subject/create',useController.postCreate);

router.get('/subject/:id',useController.getId);

router.get('/note/:id',useController.getNote);

router.post('/note/:id',useController.postNote);

router.get('/delete',useController.deleteId);

module.exports = router;