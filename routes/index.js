var express = require('express');
var mime = require('mime')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(mime);
  res.render('index', { title: '聊天室' });
});

module.exports = router;
