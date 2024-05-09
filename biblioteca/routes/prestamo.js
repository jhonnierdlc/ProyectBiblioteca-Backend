const express = require('express');
const router = express.Router();
const { Prestamo, validatePrestamo } = require('../models/prestamo');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require('../middleware/IsValidObjectId');
const axios = require('axios'); 

router.post("/", asyncHandler(async (req, res) => {
  try {
    const libroId = req.body.libroId;

    // Realiza una solicitud HTTP para obtener la información del libro por su ID
    const response = await axios.get(`http://localhost:8080/api/libro/${libroId}`);
    const libro = response.data;

    if (!libro) {
      return res.status(400).send("El libro especificado no existe");
    }

    // Obtiene la fecha actual
    const fechaInicio = new Date();

    // Calcula la fecha de devolución sumando 7 días a la fecha de inicio
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 7);

    const nuevoPrestamo = new Prestamo({
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      celular: req.body.celular,
      libro: libro,
      fecha_inicio: fechaInicio,
      fecha_devolucion: fechaDevolucion
    });

    await nuevoPrestamo.save();

    res.status(200).send("Préstamo creado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al procesar la solicitud");
  }
}));

module.exports = router;
