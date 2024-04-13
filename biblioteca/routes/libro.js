const express = require('express');
const router = express.Router()
const {ModeloLibro, validator } = require('../models/libro');
const validate = require('../middleware/validate');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require('../middleware/IsValidObjectId');

router.post("/",
 validate(validator), 
 asyncHandler(async(req,res)=>{
    await ModeloLibro(req.body).save();
    res.status(200).send("Libro Creado Exitosamente");
 })
);

router.get("/",
asyncHandler(async(req,res) => {
    const libro = await ModeloLibro.find();
    res.send(libro)
})
)

router.get("/:id",
isValidObjectId,
asyncHandler(async (req, res) => {
    const libro = await ModeloLibro.findById(req.params.id);
    res.send(libro);
})
)

//Editar
router.put(
    "/:id",
    [isValidObjectId, validate(validator)],
    asyncHandler(async (req,res) =>{
        await ModeloLibro.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send("Libro Editado Correctamente")
    })
)

//Eliminar
router.delete(
    "/:id",
    isValidObjectId,
    asyncHandler(async (req,res) => {
        await ModeloLibro.findByIdAndDelete(req.params.id);
        res.status(200).send("Libro Eliminado Correctamente")
    })
)

module.exports = router;