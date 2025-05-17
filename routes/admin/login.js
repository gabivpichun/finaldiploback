const express = require('express');
const router = express.Router();
const usuariosModel = require("./../../models/usuariosModel");

/* GET /admin/login */
router.get("/", function (req, res, next) {
  req.session.destroy();
  res.render("admin/login", {
    layout: "admin/layout",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const usuario = req.body.usuario;
    const password = req.body.password;

    const data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id;           
      req.session.nombre = data.usuario;          
      res.redirect("/admin/novedades");           
    } else {
      res.render("admin/login", {
        layout: "admin/layout",                   
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
