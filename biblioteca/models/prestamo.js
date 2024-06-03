
const mongoose = require("mongoose");
const Joi = require("joi");

const prestamoSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  celular: { type: String, required: true },
  libro: { type: Object, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_devolucion: { type: Date, required: true },
  estado_prestamo: { type: String, required: true} // Añadir campo estado
});

const Prestamo = mongoose.model("Prestamo", prestamoSchema);

const validatePrestamo = (data) => {
    const schema = Joi.object({
        cedula: Joi.string().required(),
        nombre: Joi.string().required(),
        celular: Joi.string().required(),
        libro: Joi.object().required(), // Añadir validación para el libro
        fecha_inicio: Joi.date().required(),
        fecha_devolucion: Joi.date().required(),
        estado_prestamo: Joi.string().required() // Añadir validación para el estado
    });
    return schema.validate(data);
};

module.exports = { Prestamo, validatePrestamo };
