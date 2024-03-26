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
    cc:{
        type:Number,
        required:true
    }, 
    cel:{
        type:Number,
        required:true
    },
})


const User =mongoose.model("user",userSchema)
const validator = (data)=>{
    const Schema= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().password().required(),
        direccion: Joi.string().required(),
        cc: Joi.string()
        .length(10)
        .regex(/^\d+$/).message({"string.pattern.base":"Please enter valid cc "})
        .require(),
        cel: Joi.string()
        .length(10)
        .regex(/^\d+$/).message({"string.pattern.base":"Please enter valid celular "})
        .require(),
    })
    return schema.validate(data)
};
module.exports={User, validator};