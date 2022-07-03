const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'email':{type:String,required:true,minLength:[10,'Email should be at least ten characters long']},
    'username':{type:String,required:true,minLength:[5,'Username must be at least five characters long']},
    'password':{type:String,required:true}
})


const User = new mongoose.model('user',userSchema);

module.exports = User;