const mongoose = require('mongoose');

const cryptoSchema =  new mongoose.Schema({
    name:{type:String,required:[true,'Name is required!']},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    cryptoDescription:{type:String,required:true},
    paymentMethod:{type:String,required:true,enum:['crypto-wallet','credit-card','debit-card','paypal']},
    buyACrypto:[{type:mongoose.Types.ObjectId,ref:'User'}],
    owner:{type:mongoose.Types.ObjectId,ref:'User'}
})


const Crypto = new mongoose.model('Crypto',cryptoSchema);

module.exports = Crypto;