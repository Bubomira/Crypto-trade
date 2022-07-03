const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars')

const router  = require('./router')
const {auth} = require('./middlewares/authMiddleware')
const app = express();

const start = async()=>{
    await mongoose.connect('mongodb://localhost:27017/cryptoTrade');
    console.log('Connected to database!')
}
start();

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


app.use('/static',express.static('static'));

app.engine('hbs',hbs.engine({
    extname:'hbs'
}))
app.set('view engine','hbs');

app.use(auth)
app.use(router)

app.listen(3000,()=>console.log('Server is listening on port 3000... '))