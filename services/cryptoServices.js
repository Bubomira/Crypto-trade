
const Crypto = require('../models/Crypto');

module.exports.getAllCrypto =async()=>{
    return await Crypto.find({}).lean();
}

exports.filterCrypto = async(criterias)=>{
    let crypto = await this.getAllCrypto();
    if(criterias.name!=''){       
        crypto = crypto.filter(x=>x.name.toLowerCase().startsWith(criterias.name.toLowerCase()))
    }
    if(criterias.paymentMethod!=''){
        crypto = crypto.filter(x=>x.paymentMethod==criterias.paymentMethod)
    }
    return crypto;
}

module.exports.createCrypto = async(data,ownerId)=>{  
        await Crypto.create({
            name:data.name,
            image:data.image,
            price:data.price,
            cryptoDescription:data.cryptoDescription,
            paymentMethod:data.paymentMethod,
            owner:ownerId
        })  
    
}

module.exports.getCryptoById = async(id)=> await Crypto.findById(id).lean();

module.exports.updateCrypto = async(id,data)=>{
        await Crypto.findByIdAndUpdate(id,{
         name:data.name,
         image:data.image,
         price:data.price,
         cryptoDescription:data.cryptoDescription,
         paymentMethod:data.paymentMethod,      
        })
}

module.exports.deleteCrypto = async(id)=>{
    await Crypto.findByIdAndDelete(id);
}

module.exports.buyCrypto = async(id,buyers)=>{
   await Crypto.findByIdAndUpdate(id,{
       buyACrypto:buyers
   })
  
}

module.exports.isCryptoBought = async(buyers,id)=>{
  const buyersString = [];
  for (const buyer of buyers) {
      if(buyer!=null){
          buyersString.push(buyer.toString())
      }
  }
  return buyersString.includes(id)
}

