const express = require('express');
const router = express.Router();
const { Multa, validateMulta } = require('../models/multa');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require('../middleware/IsValidObjectId');
const axios = require('axios'); // Importa axios para realizar solicitudes HTTP

router.post("/", async (req, res) => {
  try {
    const clienteId = req.body.clienteId;

    // Realiza una solicitud HTTP para obtener la información del libro por su ID
    const response = await axios.get(`http://localhost:8080/api/client/${clienteId}`);
    const cliente = response.data;

    if (!cliente) {
      return res.status(400).send("El cliente especificado no existe");
    }

    const nuevaMulta = new Multa({
      libro: req.body.libro,
      cliente: cliente,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    });

    await nuevaMulta.save();

    res.status(200).send("multa creado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al procesar la solicitud");
  }
});

// Agrega tus otras rutas aquí...

module.exports = router;