var express = require('express')
var router = express.Router();
var useController=require('../controller/api.controller');

router.get('/quanlymon',useController.get);

router.post('/quanlymon',useController.post);

router.get('/note/:tenmon',useController.getDetail);

router.post('/note/:tenmon',useController.postDetail);

router.delete('/note/:idnote',useController.deleteDetail);

// router.get('/delete',useController.deleteId);

// router.get('/change',useController.change)

// router.post('/change',useController.postChange);

// router.get('/search',useController.search);

// router.post('/',useController.post);

module.exports = router;