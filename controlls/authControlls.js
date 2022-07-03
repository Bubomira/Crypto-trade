const authRouter = require('express').Router();

const {registerUser,logInUser}  = require('../services/authService');

authRouter.get('/login',(req,res)=>{
   res.render('login')
})

authRouter.post('/login',async(req,res)=>{
   try{
      const token =await logInUser(req.body);
      res.cookie('session',token);
      res.redirect('/')     
   }catch(err){
     res.render('login',{error:err.message})
   }
})


authRouter.get('/register',(req,res)=>{
   res.render('register')
})

authRouter.post('/register',async(req,res)=>{
   try{
      const token = await registerUser(req.body);
       res.cookie('session',token)
       res.redirect('/')
   }catch(err){
    res.render('register',{error:err.message})
   }
})

authRouter.get('/logout',(req,res)=>{
   res.clearCookie('session');
   res.redirect('/')
})

module.exports = authRouter;