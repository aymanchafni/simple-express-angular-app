var conn= require('../db_conn');


var retreive_user_info=function (id_user,callback) {
  conn.query("select * from user where id_user= ?",[id_user], function (err, result) {
      if (err) return callback(err);
      callback(null,result);


    });
  }

module.exports=retreive_user_info;
