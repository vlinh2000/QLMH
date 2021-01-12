var conn = require('../mysql');


module.exports.get=function(req,res){
	res.render('login');
}

module.exports.postLogin=function(req,res){
	var errs=[];
    var email=req.body.email;
    var password =req.body.password;
	var sql = 'select IDUSER,PASS from USER where USERNAME="'+email+'"';
	conn.query(sql,function(err,results){
		if(err) throw err;
		else{
			if(results.length===0){
				res.render('login',{
					errs:["Email không tồn tại !"],
					values:req.body
				});
				return;
			}
			if(password!==results[0].PASS){
				res.render('login',{
					errs:["Sai mật khẩu !"],
					values:req.body
				});
				return;
			}
			res.cookie("userID",results[0].IDUSER,{
				signed:true
			});
			res.redirect("/");
			
		}
	})
   
}