var db=require('../db');
var today = new Date();
var day = (today.getDay()+1).toString();
var notif = db.get("TKB").find({id: day}).value();
module.exports.get=function(req,res){
	res.render("tkb",{
		TKB : db.get('TKB').value(),
		today : day,
		notif : notif
	});
}