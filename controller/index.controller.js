var db= require('../db');
var shortid= require("shortid");
var subject = db.get("subject").value(); 


var today = new Date();
var day = (today.getDay()+1).toString();
var notif = db.get("TKB").find({id: day}).value();
module.exports.get= function(req,res){
	 var subject = db.get("subject").value().filter((x)=>x.time==="2019hk2");
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
	req.body.total=0;
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
	var total=db.get('subject').find({id:id}).get('news').value().length;
	db.get('subject').find({id:id}).set("total",total).write();
	
	res.redirect('/subject/'+id);
}

module.exports.deleteId= function(req,res){
	var idSub= req.query.idSub;
	var idNews= req.query.idNews;

	var newDel = db.get('subject').find({id:idSub}).get('news').find({id:idNews}).value();
    db.get('subject').find({id:idSub}).get('news').remove(newDel).write();
    var total=db.get('subject').find({id:idSub}).get('news').value().length;
	db.get('subject').find({id:idSub}).set("total",total).write();
	res.redirect("/subject/"+idSub);
}

module.exports.change= function(req,res){
   
   var idSub= req.query.idSub;
   var idNews= req.query.idNews;
   var nChange = db.get('subject').find({id:idSub}).get('news').find({id:idNews}).value();
	res.render("change",{
		idSub,
		idNews,
		nChange
	});
}

module.exports.postChange= function(req,res){
   
   var idSub= req.query.idSub;
   var idNews= req.query.idNews;
   var nChange = db.get('subject').find({id:idSub}).get('news').find({id:idNews}).value();
   req.body.id = idNews;
   req.body.daytime= nChange.daytime;
   req.body.content =  req.body.content.split('\r\n'||'\r\n\r\n')
  db.get('subject').find({id:idSub}).get('news').find({id:idNews})
   	.assign({title:req.body.title})
   	.assign({content:req.body.content})
   	.assign({daytime:req.body.daytime})
   	.assign({id:req.body.id})
   	.write();
   // console.log(req.body);
   res.redirect("/subject/"+idSub);
}

module.exports.search= function(req,res){
	var q=req.query.q;
	var subject = db.get('subject').value().filter((x)=>x.name.toUpperCase().indexOf(q.toUpperCase())!==-1||
		x.code.toUpperCase().indexOf(q.toUpperCase())!==-1||x.tcName.toUpperCase().indexOf(q.toUpperCase())!==-1);
	res.render('index',{
		subjects : subject,
		notif: notif
	});
}

module.exports.post=function(req,res){
	var yeaterm = req.body.year+'hk'+req.body.term;
	var subFiltered = db.get("subject").value().filter((x)=>x.time===yeaterm);
	var returnYear=req.body.year;  
	res.render('index',{
		subjects:subFiltered,
		year:returnYear,
		term:req.body.term,
		notif: notif
	})
}