const express = require('express');
const router = express.Router()
const { ModeloLibro, validator } = require('../models/libro');
const validate = require('../middleware/validate');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require('../middleware/IsValidObjectId');

router.post("/",
    validate(validator),
    asyncHandler(async (req, res) => {
        // Buscar si ya existe un libro con los mismos atributos
        const existingLibro = await ModeloLibro.findOne({
            isbn: req.body.isbn,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            portada: req.body.portada,
            autor: req.body.autor
        });

        if (existingLibro) {
            // Si el libro ya existe, simplemente incrementa la cantidad disponible
            existingLibro.cantidad++;
            await existingLibro.save();
            return res.status(200).send("Cantidad disponible del libro actualizada");
        } else {
            // Si el libro no existe, crea un nuevo documento
            const nuevoLibro = await ModeloLibro(req.body).save();
            nuevoLibro.cantidad++;
            await nuevoLibro.save();
            return res.status(200).send("Libro Creado Exitosamente");
        }
    })
);


router.get("/",
    asyncHandler(async (req, res) => {
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
    asyncHandler(async (req, res) => {
        await ModeloLibro.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send("Libro Editado Correctamente")
    })
)

//Eliminar
router.delete(
    "/:id",
    isValidObjectId,
    asyncHandler(async (req, res) => {
        const libro = await ModeloLibro.findById(req.params.id);
        if (!libro) return res.status(404).send("Libro no encontrado");

        if (libro.cantidad > 0) {
            libro.cantidad--; // Decrementar la cantidad disponible del libro eliminado
            await libro.save();
        }else{
            await ModeloLibro.findByIdAndDelete(req.params.id);
        }
            res.status(200).send("Libro Eliminado Correctamente")
    })
)

module.exports = router;