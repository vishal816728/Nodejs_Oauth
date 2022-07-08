const express=require('express')
const router=express.Router()
const {ensureAuth,ensureGuest}=require("../middleware/auth")
const storymodel=require("../models/story.model")

//  Login/landing page
router.get("/",(req,res)=>{
    res.render("login",{
        layout:"login"
    })
})

//DashBoard
router.get("/dashboard",ensureAuth,async (req,res)=>{
    try{
        const stories=await storymodel.find({user:req.user.id}).lean()
        res.render("dashboard",{
            name:req.user.firstName,
            stories
        })
    }catch(err){
         console.log(err)
         res.render("error/error")
    }
})

router.get("/stories/add",ensureAuth,async (req,res)=>{
    res.render("stories/add")
})

module.exports=router