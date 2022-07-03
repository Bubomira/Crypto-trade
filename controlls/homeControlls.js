const homeRouter = require('express').Router();


homeRouter.get('/',async(req,res)=>{
  res.render('home')
})

module.exports = homeRouter;