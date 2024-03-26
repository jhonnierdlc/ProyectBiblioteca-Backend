const express = require('express');
const router =express.Router();
const {Employees, validator, User}=require('../models/client');
const validate =require('../middleware/validate');
const isValidObjectId=require('../middleware/isValidObjectId')
const asyncHandler=require('../middleware/asyncHandler')

router.post("/", validate(validator),
    asyncHandler(async(req,res)=>{
        await User(req.body).save();
        res.status(200).send("user created sucessfully")
    })
);

router.get(
    "/",
    asyncHandler(async(req,res)=>{
        const users =await User.find();
        res.send(users)
    })
)

router.get(
    "/:id",
    isValidObjectId(async(req,res)=>{
        const users =await User.findById(req.params.id);
        res.send(users)
    })
)


router.put(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await User.findByIdAndUpdate({_id:req.params.id}, req.body)
         res.status(200).send("user update sucessfully")
        
    })
)

router.delete(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await User.findByIdAndDelete({_id:req.params.id}, req.body)
         res.status(200).send("users deleted sucessfully")
        
    })
)
module.exports=router;