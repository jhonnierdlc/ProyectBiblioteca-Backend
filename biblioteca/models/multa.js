const mongoose = require("mongoose");
const Joi = require("joi");


const schemaMulta = new mongoose.Schema({
	libro: { type: String, required: true },
    cliente:{ type: Object, required: true },
    descripcion:  { type: String, required: true },
    precio:  { type: String, required: true },
    estado:  { type: String, required: true },
   
});

const Multa = mongoose.model("Multa", schemaMulta);

const validateMulta = (data) => {
    const schema = Joi.object({
        libro: Joi.string().required(),
        cliente: Joi.object().required(),
        descripcion: Joi.string().required(),
        precio: Joi.string().required(),
        estado: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { Multa, validateMulta };