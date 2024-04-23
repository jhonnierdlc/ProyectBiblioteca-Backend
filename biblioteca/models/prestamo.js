const mongoose = require("mongoose");
const Joi = require("joi");


const prestamoSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  isbn: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_devolucion: { type: Date }
});

const Prestamo = mongoose.model("Prestamo", prestamoSchema);

const validatePrestamo = (data) => {
    const schema = Joi.object({
        cedula: { type: String, required: true },
        isbn: { type: String, required: true },
        fecha_prestamo: Joi.date().required(),
        fecha_devolucion: Joi.date()
    });
    return schema.validate(data);
};
const realizarPrestamo = async (clienteId, libroId) => {
    const clienteExistente = await Cliente.findById(clienteId);
    if (!clienteExistente) {
        throw new Error('El cliente no existe');
    }
    const libroExistente = await ModeloLibro.findById(libroId);
    if (!libroExistente) {
        throw new Error('El libro no existe');
    }

    const prestamo = new Prestamo({
        cliente: clienteId,
        libro: libroId
    });
    await prestamo.save();
    return prestamo;
};

module.exports = { Prestamo, validatePrestamo, realizarPrestamo };