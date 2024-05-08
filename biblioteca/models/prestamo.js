const mongoose = require("mongoose");
const Joi = require("joi");

const prestamoSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  celular: { type: String, required: true },
  libro: { type: Object, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_devolucion: { type: Date, required: true }
});

const Prestamo = mongoose.model("Prestamo", prestamoSchema);

const validatePrestamo = (data) => {
    const schema = Joi.object({
        cedula: Joi.string().required(),
        nombre: Joi.string().required(),
        celular: Joi.string().required(),
        fecha_inicio: Joi.date().required(),
        fecha_devolucion: Joi.date().required()  
    });
    return schema.validate(data);
};

module.exports = { Prestamo, validatePrestamo };
