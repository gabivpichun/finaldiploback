const express = require('express');
const router = express.Router();
const novedadesModel = require("./../models/novedadesModel");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");


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

router.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje, telefono } = req.body;

  // Definir el contenido del correo
  const mail = {
    to: 'gabrielapichun6@gmail.com',
    subject: 'Contacto desde la web',
    html: `
      <p><strong>${nombre}</strong> se contactó a través de la web.</p>
      <p>Email: ${email}</p>
      <p>Mensaje: ${mensaje}</p>
      <p>Teléfono: ${telefono}</p>
    `
  };

  try {
    // Configuración del transportador SMTP
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Enviar el correo
    await transport.sendMail(mail);

    // Respuesta OK
    res.status(201).json({
      error: false,
      message: 'Mensaje enviado con éxito'
    });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({
      error: true,
      message: 'Hubo un error al enviar el mensaje'
    });
  }
});

module.exports = router;
