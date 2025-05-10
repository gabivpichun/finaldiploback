const express = require('express');
const router = express.Router();

/* GET /admin/login */
router.get('./login', function (req, res, next) {
    res.render('admin/login', { layout: 'admin/layout' });
});

module.exports = router;


