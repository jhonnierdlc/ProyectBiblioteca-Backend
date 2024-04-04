const mongoose = require("mongoose");
const Joi = require("joi");


const clienteSchema = new mongoose.Schema({
	cedula: { type: String, required: true },
	nombre: { type: String, required: true },
	edad: { type: Number, required: true },
	direccion: { type: String, required: true },
	celular: { type: Number, required: true },
});

const Cliente = mongoose.model("cliente", clienteSchema);

const validator = (data) => {
	const schema = Joi.object({
		cedula: Joi.string().required(),
		nombre: Joi.string().required(),
		edad: Joi.number().required(),
		direccion: Joi.string().required(),
		celular: Joi.number().required(),
	});
	return schema.validate(data);
};

module.exports = { Cliente, validator };