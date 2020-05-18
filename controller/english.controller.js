var db = require('../db');

module.exports.get=function(req,res){
	res.render('english',{
		vocab: db.get('vocab').value()
	});
}

module.exports.post=function(req,res){
	var id=db.get('vocab').value().length;
	req.body.audio = req.file.path.split('\\').slice(1).join('/');
	req.body.id=id;
	db.get('vocab').push(req.body).write();
	res.redirect('/english');
}

module.exports.create=function(req,res){
	res.render('createWord');
}

// module.exports.searchAudio=function(req,res){
// 	var w = req.query.w;
//     var word=db.get('vocab').value().filter((x)=>x.word === w)
//     res.render('english',{
//     	vocab: db.get('vocab').value(),
//     	audio : word[0].audio
//     });
// }