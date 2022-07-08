const express=require('express')
const router=express.Router()
const passport=require('passport')



//  auth google page
router.get("/google",passport.authenticate('google',{
    scope:['Profile']
}))

//DashBoard
router.get("/google/callback",passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/dashboard')})

  router.get('/logout', (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
    
  })

module.exports=router