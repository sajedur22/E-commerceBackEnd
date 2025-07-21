const express=require('express');
const router = require("./src/routes/api");
require('dotenv').config();

const app=new express();


//Security Middleware Import
const rateLimit= require('express-rate-limit')
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean')
const hpp=require('hpp')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose');
const path=require('path');

//DataBase connection


const uri = process.env.MONGO_URI;

const options = {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  autoIndex: process.env.MONGO_AUTO_INDEX === 'true',
};

mongoose.connect(uri, options)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

//Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cookieParser());



app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

//Request Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter)
app.set('etag',false);



app.use("/api/v1",router);




//Undefined Route
app.use('*',(req,res)=>{



    res.status(404).json({status:"fail",data:"Not found"})
})

module.exports=app;



