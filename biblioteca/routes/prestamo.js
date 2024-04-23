const express = require('express');
const router = express.Router()
const {ModeloPrestamo, validator } = require('../models/prestamo');
const validate = require('../middleware/validate');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require('../middleware/IsValidObjectId');

router.post("/",
 validate(validator), 
 asyncHandler(async(req,res)=>{
    await ModeloPrestamo(req.body).save();
    res.status(200).send("prestamo Creado Exitosamente");
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