const express = require('express');
const router = express.Router()
const {ModeloPrestamo, validator } = require('../models/prestamo');
const validate = require('../middleware/validate');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require('../middleware/IsValidObjectId');
const clienteConsulta=require('../routes/client');
const libroConsulta=require('../routes/libro')

router.post("/", 
  validate(validator), 
  asyncHandler(async (req, res) => {
    // Verificar si el cliente existe
    const cliente = await Cliente.findById(req.body.clienteId);
    if (!cliente) {
      return res.status(400).send("El cliente especificado no existe");
    }

    // Verificar si el libro existe
    const libro = await Libro.findById(req.body.libroId);
    if (!libro) {
      return res.status(400).send("El libro especificado no existe");
    }

    // Crear el préstamo
    const nuevoPrestamo = new Prestamo({
      cliente: cliente._id,
      libro: libro._id,
      fecha_inicio: req.body.fecha_inicio,
      fecha_devolucion: req.body.fecha_devolucion
    });

    await nuevoPrestamo.save();
    res.status(200).send("Préstamo creado exitosamente");
  })
);


router.get("/",
asyncHandler(async(req,res) => {
    const prestamo = await ModeloPrestamo.find();
    res.send(prestamo)
})
)

router.get("/:id",
isValidObjectId,
asyncHandler(async (req, res) => {
    const prestamo = await ModeloPrestamo.findById(req.params.id);
    res.send(prestamo);
})
)

//Editar
router.put(
    "/:id",
    [isValidObjectId, validate(validator)],
    asyncHandler(async (req,res) =>{
        await ModeloPrestamo.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send("prestamo Editado Correctamente")
    })
)

//Eliminar
router.delete(
    "/:id",
    isValidObjectId,
    asyncHandler(async (req,res) => {
        await ModeloPrestamo.findByIdAndDelete(req.params.id);
        res.status(200).send("prestamo Eliminado Correctamente")
    })
)



module.exports = router;