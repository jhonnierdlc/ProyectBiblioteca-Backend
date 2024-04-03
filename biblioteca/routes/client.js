const express = require('express');
const router =express.Router();
const {Client,validator}=require('../models/client');
const validate =require('../middleware/validate');
const isValidObjectId=require('../middleware/isValidObjectId');
const asyncHandler = require('../middleware/asyncHandler')

router.post("/", validate(validator),
    asyncHandler(async(req,res)=>{
        await Client(req.body).save();
        res.status(200).send("user created sucessfully")
    })
);

router.get(
    "/",
    asyncHandler(async(req,res)=>{
        const clients =await Client.find();
        res.send(clients)
    })
)

router.get(
    "/:id",
    isValidObjectId(async(req,res)=>{
        const clients =await Client.findById(req.params.id);
        res.send(clients)
    })
)


router.put(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await Client.findByIdAndUpdate({_id:req.params.id}, req.body)
         res.status(200).send("user update sucessfully")
        
    })
)

router.delete(
    "/",
    [isValidObjectId, validate(validator)],
    asyncHandler(async(req,res)=>{
         await Client.findByIdAndDelete({_id:req.params.id}, req.body)
         res.status(200).send("users deleted sucessfully")
        
    })
)
module.exports=router;