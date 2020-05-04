var express = require('express');
var router = express.Router();
var service=require('../services/service_profile');

/* GET users listing. */
router.get('/:username', function(req, res, next) {

  service.retreive_user_info(req.params.username,function(err,result){
    if (err) throw err;
    res.json(result);
  });

});

router.get('/', function(req, res, next) {

  service.check_username_exists(req.query.username,function(err,result){
    if (err) throw err;
    if (result != '')
           res.send(String(1));
    else
           res.send(String(0));

  });

});

router.put('/info/:username', function(req, res, next) {

  service.change_user_info(req.params.username,req.body,function(err,result){
    if (err) throw err;
    console.log(result);

  });

});

router.get('/pass/:username', function(req, res, next) {

  service.check_pass_correct(req.params.username,function(err,result){
    if (err) throw err;
    console.log(result);
    if (result[0].password == req.query.pass)
           res.send(String(1));
    else
           res.send(String(0));
  });

});

router.put('/pass/:username', function(req, res, next) {

  service.change_user_pass(req.params.username,req.body,function(err,result){
    if (err) throw err;
    console.log(result);

  });

});



module.exports = router;
