var db= require('../db');
var shortid= require("shortid");
var subject = db.get("subject").value(); 


var today = new Date();
var day = (today.getDay()+1).toString();
var notif = db.get("TKB").find({id: day}).value();
module.exports.get= function(req,res){

	res.render('index',{
		subjects : subject,
		notif: notif
	});
}

module.exports.create= function(req,res){
	res.render('create');
}

module.exports.postCreate= function(req,res){
	req.body.id = shortid.generate();
	req.body.news=[];
	db.get("subject").push(req.body).write();
	res.redirect("/");
}

module.exports.getId= function(req,res){
	var id = req.params.id;
	var sub = db.get('subject').find({id : id}).value();
	res.render('detailSub',{
		subject: sub,
	});
}

module.exports.getNote= function(req,res){
	res.render('note',{
		id: req.params.id
	});
}

module.exports.postNote= function(req,res){
	var today = new Date();
	var day = today.getDate() + "-" + (today.getMonth()+ 1) + "-" +today.getFullYear()
	var time = today.getHours() + ":" + today.getMinutes();
	var daytime = time + " " + day;
	req.body.daytime= daytime;
	var id = req.params.id;
	req.body.id = shortid.generate();
	req.body.content =  req.body.content.split('\r\n'||'\r\n\r\n')
	db.get('subject').find({id:id}).get('news').push(req.body).write();
	res.redirect('/subject/'+id);
}

module.exports.deleteId= function(req,res){
	var idSub= req.query.idSub;
	var idNews= req.query.idNews;

	var newDel = db.get('subject').find({id:idSub}).get('news').find({id:idNews}).value();

	db.get('subject').find({id:idSub}).get('news').remove(newDel).write();
	res.redirect("/subject/"+idSub);
}