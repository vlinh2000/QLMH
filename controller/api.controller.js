var conn = require('../mysql');

function makeDate(){
   var today = new Date();
  	var day = today.getFullYear()+ "/" + (today.getMonth()+ 1) + "/" +today.getDate() ;
  	var time = today.getHours() + ":" + today.getMinutes() +":00";
     var daytime = day + " " +time ;
     return daytime;
}



module.exports.get=function(req,res){
   // conn.connect();
   const IDUSER = req.signedCookies.userID;
    var sql='select TENMON,NHOM,HOTENGV,TERM,NAMHOC from  QUANLYMON where IDUSER="'+IDUSER+'"';
    conn.query(sql,function(err,result){
     if(err) throw err;
     else {
        res.json(result);
     }
  // conn.end();
 });
}

module.exports.getDetail=function(req,res){
   // conn.connect();
   const IDUSER = req.signedCookies.userID;
   const TENMON = req.params.tenmon;
   var TIMENOTE = makeDate();
    var sql='select IDNOTE,TIEUDE,NOIDUNG,LINK,TIMENOTE from NOTE where IDUSER="'+IDUSER+'" and TENMON="'+TENMON+'"';
    conn.query(sql,function(err,result){
     if(err) res.json({"message":err.sqlMessage});
     else if(result.length==0){
        res.json([]);
     }
     else {
        res.json(result);
     }
  // conn.end();
 });
}

module.exports.post= function(req,res){
   const iduser = req.signedCookies.userID;
   const {tenmon,hotengv,nhom,hocky,nam} = req.body;
	var sql = 'insert into QUANLYMON values ("'+iduser+'","'+tenmon+'","'+nhom+'","'+hotengv+'","'+hocky+'","'+nam+'")';
	//conn.connect();
	conn.query(sql,function(err,results){
	 if(err) res.json({"message":err.sqlMessage});
	 else{
         res.json({"message":"Thêm môn học thành công!"});
     }
   // conn.end();
	});
}

module.exports.postDetail= function(req,res){
   const iduser = req.signedCookies.userID;
   const TENMON = req.params.tenmon;
   var TIMENOTE = makeDate();
   const {tieude,noidung,link} = req.body;
   if(tieude.length===0 || noidung.length===0 || link.length===0){
      var check = [{"value":tieude,"name":"tiêu đề"},{"value":noidung,"name":"nội dung"},{"value":link,"name":"link"}];
      check = check.filter((x)=>x.value==0);
      var content = check.map((x)=>x.name).join(" ");
      var message = 'Vui lòng nhập '+content;
      res.json({"message":message});
  
   }else{
var sql = 'insert into NOTE (TIEUDE,NOIDUNG,LINK,IDUSER,TENMON,TIMENOTE) values ("'+tieude+'","'+noidung+'","'+link+'","'+iduser+'","'+TENMON+'","'+TIMENOTE+'")';
	//conn.connect();
	conn.query(sql,function(err,results){
	 if(err) res.json({"message":err.sqlMessage});
	 else{
         res.json({"message":"Thêm note thành công!"});
     }
   // conn.end();
	});
   }
}

module.exports.deleteDetail= function(req,res){
   const IDNOTE = req.params.idnote;
var sql = 'delete from NOTE where IDNOTE="'+IDNOTE+'"';
	//conn.connect();
	conn.query(sql,function(err,results){
	 if(err) res.json({"message":err.sqlMessage});
	 else{
         res.json({"message":"Xóa note thành công!"});
     }
   // conn.end();
	});
}