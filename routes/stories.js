const express=require('express')
const router=express.Router() 
const storymodel=require("../models/story.model")
const user=require("../models/User")
//  Login/landing page
router.get("/add",(req,res)=>{
    res.render('stories/add')
})


// post request to stories
router.post("/",async (req,res)=>{
    try{
        req.body.user=req.user.id
        await storymodel.create(req.body)
        res.redirect("/dashboard")
    }catch(err){
        console.log(err)
        res.render('error/error')
    }
})

router.get("/",async (req,res)=>{
    try {
        const stories=await storymodel.find({status:'public'})
        .populate('user')
        .sort({createdAt:'desc'})
        .lean()

        res.render('stories/index',{
            stories
        })
    } catch (error) {
        
    }
})





module.exports=router