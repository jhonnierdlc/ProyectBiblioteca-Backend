const mongoose = require("mongoose");

const schemaHistorialPrestamo = new mongoose.Schema({
    prestamo: {type: Object, required: true},//id, fechainicio, fechadevolucion
    libro: {type: Object, required: true},//id y titulo
    cliente: {type: Object, required: true},//cc y nombre
    multa: {type: Object, required: true},//precio
});

const HistorialPrestamo = mongoose.model("HistorialPrestamo",schemaHistorialPrestamo);

module.exports = HistorialPrestamo;