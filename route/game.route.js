var express = require('express')
var router = express.Router();
var useContr=require('../controller/game.controller');

router.get('/game',useContr.get);

module.exports = router;