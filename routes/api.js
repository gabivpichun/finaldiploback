const express = require('express');
const router = express.Router();
const novedadesModel = require("./../models/novedadesModel");
const cloudinary = require("cloudinary").v2;

router.get("/novedades", async function (req, res, next) {
    try {
        let novedades = await novedadesModel.getNovedades();

        console.log('novedades:', novedades);

        if (!Array.isArray(novedades)) {
            throw new Error("getNovedades no devolvió un array");
        }

       
        const resultado = novedades.map(novedad => ({
            titulo: novedad.titulo,
            subtitulo: novedad.subtitulo,
            cuerpo: novedad.cuerpo
        
        }));

        res.json(resultado);

    } catch (error) {
        console.error("Error en /api/novedades:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;

