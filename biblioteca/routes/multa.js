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

    const estado = 'Activo'

    const nuevaMulta = new Multa({
      libro: req.body.libro,
      cliente: cliente,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      estado : estado,
    });

    await nuevaMulta.save();

    res.status(200).send("multa creado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al procesar la solicitud");
  }
});

router.get("/:id", asyncHandler(async (req, res) => {
  try {
      const multaId = req.params.id;

      // Buscar la multa por su ID
      const multa = await modeloMulta.findById(multaId);

      if (!multa) {
          return res.status(404).send("Multa no encontrada");
      }

      res.status(200).json(multa);
  } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al procesar la solicitud");
  }
}));

router.put("/:id", asyncHandler(async (req, res) => {
  try {
      const multaId = req.params.id;
      const { libro, cliente, descripcion, precio } = req.body;

      // Actualizar la multa por su ID
      await modeloMulta.findByIdAndUpdate(multaId, { libro, cliente, descripcion, precio });

      res.status(200).send("Multa actualizada exitosamente");
  } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al procesar la solicitud");
  }
}));

router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req,res) => {
      await Multa.findByIdAndDelete(req.params.id);
      res.status(200).send("multa Elimindo Correctamente")
  })
)


module.exports = router;