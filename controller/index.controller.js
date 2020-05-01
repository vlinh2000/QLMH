var db= require('../db');
var shortid= require("shortid");
var subject = db.get("subject").value(); 

module.exports.get= function(req,res){
	res.render('index',{
		subjects : subject
	});
}

module.exports.subject= function(req,res){
	res.render('subject');
}

module.exports.create= function(req,res){
	res.render('create');
}

module.exports.postCreate= function(req,res){
	req.body.id = shortid.generate();
	db.get("subject").push(req.body).write();
	res.redirect("/");
}