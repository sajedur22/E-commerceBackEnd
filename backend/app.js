const express=require('express');
const router = require("./src/routes/api");
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
let URI="mongodb+srv://<username>:<password>@cluster0.sb8za.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0"
let OPTION={user:"shakil2000",pass:"shakil2000",autoIndex:true}

mongoose.connect(URI,OPTION).then((res)=>{
    console.log('DB success')
}).catch((err)=>{
    console.log(err);
})

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



