const mongoose = require("mongoose");
const Joi = require("joi");


const eschemalibro = new mongoose.Schema({
	isbn: { type: String, required: true },
	titulo: { type: String, required: true },
	descripcion: { type: String, required: true },
	portada: { type: String, required: true },
	autor: { type: String, required: true },
	cantidad: { type: Number, default: 0 }
});

const ModeloLibro = mongoose.model("libros", eschemalibro);

const validator = (data) => {
	const schema = Joi.object({
		isbn: Joi.string().required(),
		titulo: Joi.string().required(),
		descripcion: Joi.string().required(),
		portada: Joi.string().required(),
		autor: Joi.string().required(),
		cantidad: Joi.number()
	});
	return schema.validate(data);
};

module.exports = { ModeloLibro, validator };