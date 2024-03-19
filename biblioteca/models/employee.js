const mongoose=require('mongoose');
const Joi =require('joi');

const employeeSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }

})

const Employee =mongoose.model("employee",employeeSchema)
const validator = (data)=>{
    const Schema= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string()
        .length(10)
        .regex(/^\d+$/).message({"string.pattern.base":"Please enter valid mobile number"})
        .require()
    })
    return schema.validate(data)
};
module.exports={Employee, validator};
