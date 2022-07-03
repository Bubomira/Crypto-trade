const User = require('../models/User');

module.exports.getUsers = async(peopleId,newId)=>{
    let result = []
   for (const id of peopleId) {
       result.push(await User.findOne({_id:id}))
   }
   result.push(await User.findOne({_id:newId}))
   return result
}

