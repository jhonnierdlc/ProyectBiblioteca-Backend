const express = require('express');
const router = express.Router();
const {Multa, validator} = require('../models/multa');
const validate = require('../middleware/validate');
const isValidObjectId = require('../middleware/IsValidObjectId');
const asyncHandler = require("../middleware/asyncHandler");

//Crear Multa
router.post("/",
 validate(validator), 
 asyncHandler(async(req,res)=>{
    await Multa(req.body).save();
    res.status(200).send("Multa Creado Exitosamente");
 })
);

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