const router = require('express').Router();

const homeRouter = require('./controlls/homeControlls');
const authRouter = require('./controlls/authControlls');
const cryptoRouter = require('./controlls/cryptoControlls')

router.use('/',homeRouter);
router.use('/auth',authRouter)
router.use('/crypto',cryptoRouter)

router.get('/*',(req,res)=>{
    res.render('404')
 })

 
module.exports = router;