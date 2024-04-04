const express = require('express');
const router = express.Router();
const {Cliente, validator} = require('../models/client');
const validate = require('../middleware/validate');
const isValidObjectId = require('../middleware/IsValidObjectId');
const asyncHandler = require("../middleware/asyncHandler");

//Crear Cliente
router.post("/",
 validate(validator), 
 asyncHandler(async(req,res)=>{
    await Cliente(req.body).save();
    res.status(200).send("Cliente Creado Exitosamente");
 })
);

//Obtener Cliente
router.get("/",
asyncHandler(async(req,res) => {
    const cliente = await Cliente.find();
    res.send(cliente)
})
)

//Obtener Cliente con ID
router.get("/:id",
isValidObjectId,
asyncHandler(async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.send(cliente);
})
)

//Editar Cliente con ID

router.put(
    "/:id",
    [isValidObjectId, validate(validator)],
    asyncHandler(async (req,res) =>{
        await Cliente.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.status(200).send("Cliente Editado Correctamente")
    })
)

//Eliminar Clientes

router.delete(
    "/:id",
    isValidObjectId,
    asyncHandler(async (req,res) => {
        await Cliente.findByIdAndDelete(req.params.id);
        res.status(200).send("Cliente Elimindo Correctamente")
    })
)


module.exports = router;
