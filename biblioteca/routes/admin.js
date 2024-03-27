const express = require('express');
const router =express.Router();
const {Admin, validator}=require('../models/admin');
const validate =require('../middleware/validate');
const isValidObjectId=require('../middleware/isValidObjectId')
const asyncHandler=require('../middleware/asyncHandler')

router.post("/", validate(validator),
    asyncHandler(async(req,res)=>{
        await Admin(req.body).save();
        res.status(200).send("administrador created sucessfully")
    })
);

router.get(
    "/",
    asyncHandler(async(req,res)=>{
        const admins =await Admin.find();
        res.send(admins)
    })
)

router.get(
    "/:id",
    isValidObjectId(async(req,res)=>{
        const admins =await Admin.findById(req.params.id);
        res.send(admins)
    })
)


router.put(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await Admin.findByIdAndUpdate({_id:req.params.id}, req.body)
         res.status(200).send("administrador update sucessfully")
        
    })
)

router.delete(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await Admin.findByIdAndDelete({_id:req.params.id}, req.body)
         res.status(200).send("administrador deleted sucessfully")
        
    })
)
module.exports=router;