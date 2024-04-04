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

module.exports = router;
// router.post('/agregarlibro',(req,res)=>{
//     const nuevolibro = new ModeloLibro({
//         isbn: req.body.isbn,
//         titulo: req.body.titulo,
//         descripcion: req.body.descripcion,
//         portada: req.body.portada,
//         autor: req.body.autor,
//         idlibro: req.body.idlibro
//     })
    
//     /* nuevolibro.save(function(err){
//         if(!err){
//             res.send('Libro agregado')
//         }else{
//             res.send(err)
//         }
//     }) */
    
//     nuevolibro.save().then(function(err){
//         res.send('Libro agregado')
//     })
//     .catch(function(err){
//         res.send(err)
//     })
// })