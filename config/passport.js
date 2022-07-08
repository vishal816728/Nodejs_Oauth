const googleStrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose')
const User = require('../models/User')
const mongomodel=require('../models/User')

module.exports=function(passport){
    passport.use(new googleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
    },async (accessToken,refreshToken,Profile,done)=>{
           console.log(Profile)
           // after making sure that data is coming we will have to store the data to the database
           var newuser={
            googleId:Profile.id,
            displayName:Profile.displayName,
            firstName:Profile.name.givenName,
            lastName:Profile.name.familyName,
            image:Profile.photos[0].value
           }
           try {
               let user=await User.findOne({googleId:Profile.id})
               if(!user){
                   user=await User.create(newuser)
                   done(null,user)
               }else{
                   done(null,user)
               }
           } catch (err) {
               console.log(err)
           }
    }))

    passport.serializeUser(function (user,done){
        done(null,user.id)
    })

    passport.deserializeUser(function(id,done){
        User.findById(id,(err,res)=>{
            done(err,res)
        })
    })
}


