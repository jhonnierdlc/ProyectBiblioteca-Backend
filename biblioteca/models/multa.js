const mongoose = require("mongoose");
const Joi = require("joi");


const schemaMulta = new mongoose.Schema({
	libro: { type: String, required: true },
    client:{ type: Object, required: true },
    descripcion:  { type: String, required: true },
    precio:  { type: String, required: true },
   
});

const modeloMulta = mongoose.model("multa", schemaMulta);

const validator = (data) => {
	const schema = Joi.object({
        libro: Joi.string().required(), 
        precio: Joi.string().required(),
        descripcion: Joi.string().required(),
	});
	return schema.validate(data);
};

module.exports = { modeloMulta, validator };