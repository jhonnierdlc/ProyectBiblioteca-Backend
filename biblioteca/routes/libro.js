const express = require('express');
const router = express.Router()
const {ModeloLibro, validator } = require('../models/libro');
const validate = require('../middleware/validate');
const asyncHandler = require("../middleware/asyncHandler");

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

module.exports = router;