module.exports.get=function(req,res){
	res.render('login');
}

module.exports.postLogin=function(req,res){
	var errs=[];
    var email=req.body.email;
    var password =req.body.password;
	
	if(email!=="vietlinhst2013@gmail.com"){
		res.render('login',{
			errs:["Email khong ton tai !"],
			values:req.body
		});
		return;
	}
	if(password!=="123123"){
		res.render('login',{
			errs:["Sai mat khau !"],
			values:req.body
		});
		return;
	}
  
   res.cookie("userID",'12345',{
   	signed:true
   });
   res.redirect("/subject");
}