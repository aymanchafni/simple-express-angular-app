var express = require('express');
var router = express.Router();
var service=require('../services/service_profile');

/* GET users listing. */
router.get('/', function(req, res, next) {
  service(1,function(err,result){
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
