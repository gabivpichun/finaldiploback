const express = require('express');
const router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
    res.redirect('admin/login');
  });*/
 

router.get('/', (req, res) => {
  res.redirect('admin/login');
});

module.exports = router;



