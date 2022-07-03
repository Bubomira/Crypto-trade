const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const secret = 'privatesecret';
const saltRounds = 10;


module.exports.registerUser = async(data)=>{
    if(data.password<4){
        throw new Error('Password should be at least 4 characters!')
    }
   if(data.password!=data.confirmPass){
      throw new Error('Passwords dont match!')
   }

  const hashedPass = await bcrypt.hash(data.password,saltRounds);
  const user = await User.create({
     'email':data.email,
     'username':data.username,
     'password':hashedPass
  });
  return  createToken(user._id,user.username,user.email);
}


module.exports.logInUser = async(data)=>{
   const user = await User.findOne({email:data.email});
   if(!user){
      throw new Error('Invalid user!')
   }
   const passwordIsValid = await bcrypt.compare(data.password,user.password);
   if(!passwordIsValid){
      throw new Error('Password and username dont match!')
   }
   return createToken(user)
}

module.exports.findUser =  async(id)=>{
return User.findOne({_id:id})
}

module.exports.decodeToken = (token)=>{
   return jwt.verify(token,secret);
}


const createToken = async(data)=>{
  let result = new Promise((resolve,reject)=>{
      jwt.sign({_id:data._id,username:data.username,email:data.email},secret,{expiresIn:'2d'},(err,token)=>{
         if(err){
            return reject(err)
         }
         resolve(token)
      })

    })
    return result
}