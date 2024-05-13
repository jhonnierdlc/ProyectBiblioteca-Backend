const express = require('express');
const router = express.Router();
const {Multa, validator} = require('../models/multa');
const validate = require('../middleware/validate');
const isValidObjectId = require('../middleware/IsValidObjectId');
const asyncHandler = require("../middleware/asyncHandler");
const axios = require('axios'); 

//Crear Multa
router.post("/", asyncHandler(async (req, res) => {
    try {
      const clientetId = req.body.clientetId;
  
      // Realiza una solicitud HTTP para obtener la información del libro por su ID
      const response = await axios.get(`http://localhost:8080/api/client/${clientetId}`);
      const cliente = response.data;
  
      if (!cliente) {
        return res.status(400).send("El cliente especificado no existe");
      }
  
      const nuevoMulta = new Multa({
        libro: req.body.libro,
        cliente: cliente,
       
      });
  
      await nuevoMulta.save();
  
      res.status(200).send("Multa creado exitosamente");
    } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al procesar la solicitud");
    }
  }));

//Obtener Multa
router.get("/",
asyncHandler(async(req,res) => {
    const multa = await Multa.find();
    res.send(multa)
})
)

//Obtener Multa con ID
router.get("/:id",
isValidObjectId,
asyncHandler(async (req, res) => {
    const multa = await Multa.findById(req.params.id);
    res.send(multa);
})
)

//Editar Multa con ID

router.put(
    "/:id",
    [isValidObjectId, validate(validator)],
    asyncHandler(async (req,res) =>{
        await Multa.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.status(200).send("Multa Editado Correctamente")
    })
)

//Eliminar Multa

router.delete(
    "/:id",
    isValidObjectId,
    asyncHandler(async (req,res) => {
        await Multa.findByIdAndDelete(req.params.id);
        res.status(200).send("Multa Elimindo Correctamente")
    })
)


module.exports = router;