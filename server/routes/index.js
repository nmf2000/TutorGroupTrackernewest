var express = require('express');
var router = express.Router();
var studentCtrl = require('../controllers/students');


/* GET home page. */
router.get('/', studentCtrl.dashboard);

module.exports = router;
