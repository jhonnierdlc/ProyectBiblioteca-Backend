const mongoose = require("mongoose");
const Joi = require("joi");

const schemaHistorialPrestamo = new mongoose.Schema({
    prestamo: {type: Object, required: true},//id, fechainicio, fechadevolucion
    libro: {type: Object, required: true},//id y titulo
    cliente: {type: Object, required: true},//cc y nombre
    multa: {type: Object, required: true},//precio
});

const HistorialPrestamo = mongoose.model("HistorialPrestamo",schemaHistorialPrestamo);

const validateHistorialPrestamo = (data)=>{
    const schema = Joi.object({

    });
    return schema.validate(data);
}

module.exports = {HistorialPrestamo, validateHistorialPrestamo};