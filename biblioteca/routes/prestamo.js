const express = require('express');
const router = express.Router();
const { Prestamo, validator} = require('../models/prestamo');
const validate = require('../middleware/validate');
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

//Editar
router.put(
  "/:id",
  [isValidObjectId, validate(validator)],
  asyncHandler(async (req, res) => {
      await Prestamo.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).send("Prestamo Editado Correctamente")
  })
)

//Eliminar
router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req,res) => {
      await Prestamo.findByIdAndDelete(req.params.id);
      res.status(200).send("Prestamo Elimindo Correctamente")
  })
)

//consultar
router.get("/:id",
isValidObjectId,
asyncHandler(async (req, res) => {
    const prestamo = await Prestamo.findById(req.params.id);
    res.send(prestamo);
})
)

module.exports = router;