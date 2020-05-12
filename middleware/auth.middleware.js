module.exports=function(req,res,next){

if(!req.signedCookies.userID){
	res.redirect('/auth/login');
	return;
}
 res.locals.name="LINH";
next();
}

