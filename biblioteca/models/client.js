const mongoose=require('mongoose');
const Joi =require('joi');


const clientSchema= mongoose.Schema({
    cedula:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true

    },
    edad:{
        type:String,
        required:true

    },
    sexo:{
        type:String,
        required:true
    }

   
})


const Client =mongoose.model("client",clientSchema)
const validator = (data)=>{
    const Schema= Joi.object({
        cedula: Joi.string().required(),
        name: Joi.string().required(),
        edad: Joi.string().required(),
        sexo: Joi.string().required(),
    })
    return Schema.validate(data)
};
module.exports={Client, validator};