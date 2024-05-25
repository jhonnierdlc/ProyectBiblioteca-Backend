const express = require('express');
const router = express.Router();
const { Multa, validateMulta } = require('../models/multa');
const validate = require('../middleware/validate');
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

// Consultar
router.get("/:id",
isValidObjectId,
asyncHandler(async (req, res) => {
    const multa = await Multa.findById(req.params.id);
    res.send(multa);
})
);

router.put(
  "/:id",
  [isValidObjectId, validate(validateMulta)], // Cambiado aquí
  asyncHandler(async (req, res) => {
      await Multa.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).send("Multa Editado Correctamente")
  })
);

router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req,res) => {
      await Multa.findByIdAndDelete(req.params.id);
      res.status(200).send("multa Elimindo Correctamente")
  })
)

router.get("/",
asyncHandler(async(req,res) => {
    const multa = await Multa.find();
    res.send(multa);
})
)

router.put(
  "/inactivar/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const multaActualizada = await Multa.findByIdAndUpdate(
      req.params.id,
      { estado: 'Inactivo' },
      { new: true } // Retorna el documento actualizado
    );

    if (!multaActualizada) return res.status(404).send("Multa no encontrada");

    res.status(200).send("Estado de la multa actualizado a Inactivo");
  })
)




module.exports = router;


