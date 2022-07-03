const {decodeToken} = require('../services/authService')

exports.auth = async(req,res,next)=>{
    let token = req.cookies['session'];
    if(token){
        try{
            let decodedToken = await decodeToken(token);
            req.user = decodedToken;
            res.locals.user = decodedToken;
        }catch(err){
            res.redirect('/404')
        }
    }
    next()
}