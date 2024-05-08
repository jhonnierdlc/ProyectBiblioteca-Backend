const mongoose = require("mongoose");
const Joi = require("joi");


const schemaMulta = new mongoose.Schema({
	libro: { type: String, required: true },
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
});

const modeloMulta = mongoose.model("multa", schemaMulta);

const validator = (data) => {
	const schema = Joi.object({
        cedula: Joi.string().required(),
        nombre: Joi.string().required(),
        email: Joi.string().email().required(),
       
	});
	return schema.validate(data);
};

module.exports = { modeloMulta, validator };