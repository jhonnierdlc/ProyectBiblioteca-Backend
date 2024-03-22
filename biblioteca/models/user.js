const mongoose=require('mongoose');
const Joi =require('joi');

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    genero:{
        type:String,
        required:true
    }
})

const User =mongoose.model("user",userSchema)
const validator = (data)=>{
    const Schema= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
        .length(10)
        .regex(/^\d+$/).message({"string.pattern.base":"Please enter valid password "})
        .require(),
        direccion: Joi.string().required(),
        genero: Joi.string().required(),
    })
    return schema.validate(data)
};
module.exports={User, validator};