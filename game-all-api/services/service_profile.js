var conn= require('../db_conn');

class ProfileService {
  constructor() {

  }
  static retreive_user_info(username,callback) {

    conn.query("select id_user,first_name,last_name,username,email,tel,points from user where username= ?",[username], function (err, result) {
        if (err) return callback(err);
        callback(null,result);


      });
    }

  static check_username_exists(username,callback){
    conn.query("select username from user where username= ?",[username], function (err, result) {
        if (err) return callback(err);
        callback(null,result);
       });
  }

 static check_pass_correct(username,callback)
{
  conn.query("select password from user where username= ?",[username], function (err, result) {
      if (err) return callback(err);
      callback(null,result);
     });
}
static change_user_pass(username,info,callback){
  conn.query("update user set password=? where username= ?",[info.new_pass,username], function (err, result) {
      if (err) return callback(err);
      callback(null,result);
     });

}


  static change_user_info(username,info,callback){

   let spec=[];
   let columns_values=[];

   for(let key in info)
   {
      if(info[key]!='')
      {
        spec.push(key);
        columns_values.push(info[key]);
      }
   }
    let columns="";
    for (let i = 0; i < spec.length; i++)
    {
      if(i<spec.length-1)
             columns+= spec[i] + "= ? , ";
      else
             columns+= spec[i] + "= ? ";
    }
    columns_values.push(username);
    conn.query("update user set "+ columns +" where username= ? ",columns_values, function (err, result) {
        if (err) return callback(err);
        callback(null,result);
       });
  }

}


module.exports=ProfileService;
