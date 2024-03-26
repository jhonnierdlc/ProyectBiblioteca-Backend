const express = require('express');
const router =express.Router();
const {Employees, validator}=require('../models/admin');
const validate =require('../middleware/validate');
const isValidObjectId=require('../middleware/isValidObjectId')
const asyncHandler=require('../middleware/asyncHandler')

router.post("/", validate(validator),
    asyncHandler(async(req,res)=>{
        await Employees(req.body).save();
        res.status(200).send("Employees created sucessfully")
    })
);

router.get(
    "/",
    asyncHandler(async(req,res)=>{
        const employees =await Employee.find();
        res.send(employees)
    })
)

router.get(
    "/:id",
    isValidObjectId(async(req,res)=>{
        const employees =await Employee.findById(req.params.id);
        res.send(employees)
    })
)


router.put(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await Employee.findByIdAndUpdate({_id:req.params.id}, req.body)
         res.status(200).send("Employees update sucessfully")
        
    })
)

router.delete(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await Employee.findByIdAndDelete({_id:req.params.id}, req.body)
         res.status(200).send("Employees deleted sucessfully")
        
    })
)
module.exports=router;