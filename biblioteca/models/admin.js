const mongoose=require('mongoose');
const Joi =require('joi');

const adminnSchema= mongoose.Schema({
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
    }

})

const Admin =mongoose.model("admin",adminnSchema)
const validator = (data)=>{
    const Schema= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().password().require(),
    })
    return schema.validate(data)
};
module.exports={Admin, validator};
