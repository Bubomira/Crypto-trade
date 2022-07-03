const cryptoRouter = require('express').Router();

const {getAllCrypto,createCrypto,getCryptoById,updateCrypto,deleteCrypto,buyCrypto,isCryptoBought,filterCrypto} = require('../services/cryptoServices')
const {getUsers} = require('../services/helpers');


cryptoRouter.get('/catalogue',async(req,res)=>{
   res.render('catalog',{crypto:await getAllCrypto()})
})

cryptoRouter.get('/createOffer',(req,res)=>{
   res.render('create');
})

cryptoRouter.post('/createOffer',async(req,res)=>{
    await createCrypto(req.body,req.user._id);
          res.redirect('/crypto/catalogue')    
})

cryptoRouter.get('/details/:cryptoId',async (req,res)=>{
   const crypto = await getCryptoById(req.params.cryptoId);
   if(req.user){
       const isOwner = crypto.owner ==req.user._id;
       const haveBougth = await isCryptoBought(crypto.buyACrypto,req.user._id)
       res.render('details',{crypto,isOwner,haveBougth})
   }else{
       res.render('details',{crypto})
   }
})

cryptoRouter.get('/edit/:cryptoId',async(req,res)=>{
    res.render('edit',{crypto:await getCryptoById(req.params.cryptoId)})
})


cryptoRouter.post('/edit/:cryptoId',async(req,res)=>{
     await updateCrypto(req.params.cryptoId,req.body) ;
     res.redirect(`/crypto/details/${req.params.cryptoId}`)
  
})

cryptoRouter.get('/delete/:cryptoId',(req,res)=>{
   deleteCrypto(req.params.cryptoId);
   res.redirect('/crypto/catalogue')
})

cryptoRouter.get(`/buy/:cryptoId`,async(req,res)=>{
    const crypto = await getCryptoById(req.params.cryptoId)
  const buyers = await getUsers(crypto.buyACrypto,req.user._id)
   buyCrypto(req.params.cryptoId,buyers)
   res.redirect(`/crypto/details/${req.params.cryptoId}`)
})

cryptoRouter.get('/search',async(req,res)=>{
   res.render('search',{crypto: await getAllCrypto()})
})

cryptoRouter.post('/search',async(req,res)=>{
    res.render('search',{crypto: await filterCrypto(req.body)})
})


module.exports = cryptoRouter;