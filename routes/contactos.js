// backend/routes/contactos.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hola desde la ruta de contactos');
});

module.exports = router;


