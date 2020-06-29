var db=require('../db');
var listQues = db.get('vocab').value();
module.exports.get= function(req,res){
	res.render('bfgame',{ vocab: listQues});
};